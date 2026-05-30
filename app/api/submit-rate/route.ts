import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!hasSupabaseConfig()) {
      return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });
    }
    
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const required = ['skill', 'experience', 'city', 'client_type', 'pkr_low', 'pkr_mid', 'pkr_high', 'usd_low', 'usd_mid', 'usd_high'];
    const hasMissingField = required.some((field) => body[field] === undefined || body[field] === null);

    if (hasMissingField) {
      return NextResponse.json({ error: 'Missing saved rate fields' }, { status: 400 });
    }

    const insertPayload = {
        user_id: session.user.id,
        skill: body.skill,
        experience: body.experience,
        city: body.city,
        country_code: body.country_code || 'PK',
        currency_code: body.currency_code || 'PKR',
        client_type: body.client_type,
        pkr_low: body.pkr_low,
        pkr_mid: body.pkr_mid,
        pkr_high: body.pkr_high,
        usd_low: body.usd_low,
        usd_mid: body.usd_mid,
        usd_high: body.usd_high,
      };

    const { error } = await supabase
      .from('saved_rates')
      .insert(insertPayload);

    if (error) {
      const missingGlobalLiteColumns =
        error.message.includes('country_code') || error.message.includes('currency_code');

      if (!missingGlobalLiteColumns) throw error;

      const { error: legacyError } = await supabase.from('saved_rates').insert({
        user_id: insertPayload.user_id,
        skill: insertPayload.skill,
        experience: insertPayload.experience,
        city: insertPayload.city,
        client_type: insertPayload.client_type,
        pkr_low: insertPayload.pkr_low,
        pkr_mid: insertPayload.pkr_mid,
        pkr_high: insertPayload.pkr_high,
        usd_low: insertPayload.usd_low,
        usd_mid: insertPayload.usd_mid,
        usd_high: insertPayload.usd_high,
      });
      if (legacyError) throw legacyError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting rate:', error);
    return NextResponse.json(
      { error: 'Failed to submit rate' },
      { status: 500 }
    );
  }
}
