import Stripe from 'stripe';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
// import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
// import { Database } from './supabase';

import { DIS } from '@/utils/discord';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

  try {
    const supabase = createServerSupabaseClient({ req, res });
    const result = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    });
    console.log({ result });
  } catch (e) {
    console.log('error', { e });
  }

  // const supabase = createServerSupabaseClient<Database>({ req, res });
  // const sessionData = await supabase.auth.getSession();

  console.log({ DIS });

  return {
    stripe,

    //   supabase,
    //   session: sessionData?.data?.session,
  };

  // return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
