import { procedure, router } from '@/server/trpc';
import { z } from 'zod';

export function createPaymentsService() {
  return router({
    // logIn: procedure.mutation(async ({ ctx }) => {
    //   const res = await ctx.supabase.auth.signInWithOAuth({
    //     provider: 'discord',
    //   });
    //   console.log('res');
    // }),
    retrieve: procedure
      .input(
        z.object({
          sessionId: z.string(),
        })
      )
      .query(async ({ ctx, input }) => {
        console.log('RETRIEVE');
        const { stripe } = ctx;
        const session = await stripe.checkout.sessions.retrieve(input.sessionId);

        console.log({ session });

        return session;
      }),
    purchase: procedure.mutation(async ({ ctx }) => {
      console.log('PURCHASE');
      const { stripe } = ctx;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Stubborn Attachments',
                images: [
                  'https://ogoexfvkwxcwmjqveeet.supabase.co/storage/v1/object/sign/images/ezgif.com-crop.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvZXpnaWYuY29tLWNyb3AuZ2lmIiwiaWF0IjoxNjc3NTE5MzM0LCJleHAiOjE2ODAxMTEzMzR9.5uAcy4VXjwDz8KE7NmuddmW4Tc5k4Wo5-oUCwQJPq9E&t=2023-02-27T17%3A35%3A34.739Z',
                ],
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/payment/{CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cancel',
      });

      console.log({ session });

      return session;
    }),
  });
}
