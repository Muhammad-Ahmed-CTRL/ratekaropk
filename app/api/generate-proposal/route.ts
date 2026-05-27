import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import OpenAI from 'openai';

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

    if (!geminiKey && !openaiKey) {
      return NextResponse.json(
        { error: 'AI Backend is not configured. Please add GEMINI_API_KEY or OPENAI_API_KEY to your env.' },
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

    if (!session) {
      return NextResponse.json({ error: 'Please sign in to generate and save proposals.' }, { status: 401 });
    }

    const { projectDescription, rate, clientType, skill } = await request.json();

    if (!projectDescription || !rate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a professional Pakistani freelancer pitching to a ${clientType} client for a ${skill} role at $${rate}/hr. Write a high-converting proposal.

Structure:
1. Project Understanding (hook them, show you read their needs)
2. Proposed Solution (how you'll solve it)
3. Timeline & Process (brief)
4. Budget/Rate ($${rate}/hr - justify it with your expertise)
5. Why Me (highlight Pakistani work ethic, specific skill expertise)
6. Call to Action

Keep it concise, confident, and professional. Do not use placeholders like [Insert Name], just write the template body ready to be sent. Use a natural, persuasive tone.`;

    let proposal = '';

    if (geminiKey) {
      // Use Gemini API (Free tier)
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
            temperature: 0.7,
            maxOutputTokens: 800,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Gemini API error details:', errorData);
        throw new Error(`Gemini API returned status ${response.status}`);
      }

      const data = await response.json();
      proposal = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else if (openaiKey) {
      // Use OpenAI API
      const openai = new OpenAI({
        apiKey: openaiKey,
      });

      const completion = await openai.chat.completions.create({
        model: process.env.OPENAI_PROPOSAL_MODEL || 'gpt-4o-mini',
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Client Project Description: ${projectDescription}` }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      proposal = completion.choices[0].message.content || '';
    }

    const { error: saveError } = await supabase.from('proposals').insert({
      user_id: session.user.id,
      project_description: projectDescription,
      rate_used: rate,
      generated_text: proposal,
    });

    if (saveError) {
      console.error('Proposal generated but save failed:', saveError);
    }

    return NextResponse.json({
      proposal,
      saved: !saveError,
    });
  } catch (error) {
    console.error('Error generating proposal:', error);
    return NextResponse.json(
      { error: 'Failed to generate proposal' },
      { status: 500 }
    );
  }
}
