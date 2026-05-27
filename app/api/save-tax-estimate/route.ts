import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function POST(request: Request) {
  try {
    if (!hasSupabaseConfig()) {
      return NextResponse.json({ error: 'Supabase is not configured' }, { status: 503 });
    }

    const body = await request.json();
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

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { monthly_income, is_pseb, tax_amount, net_income, annual_projection, effective_rate, tax_rate } = body;

    if (
      !Number.isFinite(Number(monthly_income)) ||
      typeof is_pseb !== 'boolean' ||
      !Number.isFinite(Number(tax_amount)) ||
      !Number.isFinite(Number(net_income)) ||
      !Number.isFinite(Number(annual_projection)) ||
      !Number.isFinite(Number(effective_rate)) ||
      typeof tax_rate !== 'string'
    ) {
      return NextResponse.json({ error: 'Invalid tax estimate fields' }, { status: 400 });
    }

    const { error } = await supabase.from('tax_estimates').insert({
      user_id: session.user.id,
      monthly_income,
      is_pseb,
      tax_amount,
      net_income,
      annual_projection,
      effective_rate,
      tax_rate,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving tax estimate:', error);
    return NextResponse.json({ error: 'Failed to save tax estimate' }, { status: 500 });
  }
}
