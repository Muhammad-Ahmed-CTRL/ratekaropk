import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import OpenAI from 'openai';

function cleanProposalText(value: string) {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/^```(?:\w+)?\s*/i, '')
    .replace(/```\s*$/i, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/^\s*[*]\s+/gm, '- ')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\[(?:insert|your|client|company|name|contact)[^\]]*\]/gi, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function POST(request: Request) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Sign-in backend is not configured.' },
        { status: 503 }
      );
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const openrouterKey = process.env.OPENROUTER_API_KEY;

    if (!geminiKey && !openaiKey && !openrouterKey) {
      return NextResponse.json(
        { error: 'AI Backend is not configured. Please add GEMINI_API_KEY, OPENAI_API_KEY, or OPENROUTER_API_KEY to your env.' },
        { status: 500 }
      );
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let userName = 'Freelancer';
    if (session?.user) {
      userName = session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Freelancer';
    }

    if (!session && process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'Please sign in to generate and save proposals.' }, { status: 401 });
    }

    const { projectDescription, rate, clientType, skill, experience } = await request.json();
    const numericRate = Number(rate);
    const serviceRole = typeof skill === 'string' ? skill.trim() : '';
    const experienceLabel =
      experience === 'junior' || experience === 'mid' || experience === 'senior'
        ? experience
        : 'mid';
    const clientTypeLabel = clientType === 'local' ? 'local' : 'foreign';
    const roleLabel = `${experienceLabel} ${serviceRole}`.trim();

    if (!projectDescription || !Number.isFinite(numericRate) || numericRate <= 0 || !serviceRole) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a professional Pakistani freelancer named "${userName}" pitching to a ${clientTypeLabel} client for a ${roleLabel} role at $${numericRate}/hr. Write a high-converting, ready-to-send proposal.

CRITICAL INSTRUCTIONS:
- Output plain text only. Do not use Markdown, bold markers, asterisks, hashtags, tables, or code fences.
- Use the actual rate of $${numericRate}/hr directly in your sentences. Do NOT write placeholders like "[Rate]" or "[Rate]/hr".
- Use the actual role "${roleLabel}" directly in your sentences. Do NOT write placeholders like "[Skill]" or "[Your Skill]".
- DO NOT USE ANY BRACKETS OR PLACEHOLDERS like "[Insert Name]", "[Your Name]", "[Your Contact Info]", "[Insert Company]", "[Client Name]", etc.
- Write as an individual freelancer using "I", not "we/us", unless the client explicitly asks for an agency/team.
- Do not add headings like "Why Choose Us" or "Why Choose Me". Keep it like a natural client message.
- You MUST sign off the proposal as "${userName}". For example: "Best regards, ${userName} | ${serviceRole}" or similar.
- Every single word must be ready to be sent. Brackets like "[ ]" are strictly forbidden in the entire output.

Use this clean message flow without printed section headings:
1. Greeting and direct acknowledgement of the project.
2. Two to three short paragraphs explaining your understanding and approach.
3. One concise timeline/process sentence.
4. One concise rate sentence that mentions "$${numericRate}/hr" and connects it to the ${serviceRole} work.
5. Confident closing and sign-off.

Keep it concise, confident, and professional. Use a natural, persuasive tone.`;

    let proposal = '';
    let success = false;

    // 1. Try OpenRouter if configured
    if (openrouterKey) {
      try {
        const openrouterModel = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.2-3b-instruct:free';
        const openai = new OpenAI({
          apiKey: openrouterKey,
          baseURL: 'https://openrouter.ai/api/v1',
          defaultHeaders: {
            'HTTP-Referer': 'https://ratekaropk.site',
            'X-Title': 'RateKaro PK',
          }
        });

        const completion = await openai.chat.completions.create({
          model: openrouterModel,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Client Project Description: ${projectDescription}` }
          ],
          temperature: 0.45,
          max_tokens: 800,
        });

        proposal = completion.choices[0].message.content || '';
        if (proposal) {
          success = true;
          console.log('Successfully generated proposal using OpenRouter');
        }
      } catch (orError) {
        console.error('OpenRouter generation failed, will try fallback if available:', orError);
      }
    }

    // 2. Try Gemini fallback if OpenRouter was not successful/configured
    if (!success && geminiKey) {
      try {
        const geminiModel = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiKey}`;

        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `Client Project Description: ${projectDescription}` }],
              },
            ],
            systemInstruction: {
              parts: [{ text: systemPrompt }],
            },
            generationConfig: {
              temperature: 0.45,
              maxOutputTokens: 800,
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          proposal = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (proposal) {
            success = true;
            console.log('Successfully generated proposal using Gemini');
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Gemini API error details during fallback:', errorData);
        }
      } catch (geminiError) {
        console.error('Gemini fallback failed:', geminiError);
      }
    }

    // 3. Try OpenAI fallback if others failed/not configured
    if (!success && openaiKey) {
      try {
        const openai = new OpenAI({
          apiKey: openaiKey,
        });

        const completion = await openai.chat.completions.create({
          model: process.env.OPENAI_PROPOSAL_MODEL || 'gpt-4o-mini',
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Client Project Description: ${projectDescription}` }
          ],
          temperature: 0.45,
          max_tokens: 700,
        });

        proposal = completion.choices[0].message.content || '';
        if (proposal) {
          success = true;
          console.log('Successfully generated proposal using OpenAI');
        }
      } catch (openaiError) {
        console.error('OpenAI fallback failed:', openaiError);
      }
    }

    if (!proposal) {
      throw new Error('All configured AI Backends failed to generate a proposal.');
    }

    proposal = cleanProposalText(proposal);

    if (!proposal) {
      throw new Error('Generated proposal was empty after cleanup.');
    }

    console.log(`Generated proposal successfully (${proposal.length} chars).`);

    let saveError = null;
    if (session) {
      const { error } = await supabase.from('proposals').insert({
        user_id: session.user.id,
        project_description: projectDescription,
        rate_used: numericRate,
        generated_text: proposal,
      });
      saveError = error;
      if (saveError) {
        console.error('Proposal generated but save failed:', saveError);
      }
    } else {
      console.log('Skipping Supabase save because no active session was found in development mode.');
    }

    return NextResponse.json({
      proposal,
      saved: session ? !saveError : false,
    });
  } catch (error) {
    console.error('Error generating proposal:', error);
    return NextResponse.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    );
  }
}
