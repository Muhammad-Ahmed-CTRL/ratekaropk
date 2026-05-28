import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const cronSecret = process.env.CRON_SECRET;
  const exchangeRatesApiKey = process.env.EXCHANGERATESAPI_KEY;

  return NextResponse.json({
    hasSupabaseUrl: !!supabaseUrl,
    hasAnonKey: !!supabaseAnonKey,
    hasServiceRoleKey: !!serviceRoleKey,
    hasCronSecret: !!cronSecret,
    hasExchangeRatesApiKey: !!exchangeRatesApiKey,
  });
}
