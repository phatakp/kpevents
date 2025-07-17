import type { TUserProfile } from '@/app/types';
import { createSupabaseServer } from '@/lib/supabase/server';
import type { User } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET(): Promise<
  NextResponse<{ user: User | null; profile: TUserProfile | null }>
> {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  const { user } = data;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    return NextResponse.json({ user, profile });
  }
  return NextResponse.json({ user: null, profile: null });
}
