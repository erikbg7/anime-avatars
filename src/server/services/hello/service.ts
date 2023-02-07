import { procedure, router } from '@/server/trpc';
import { z } from 'zod';

export function createHelloService() {
  return router({
    sayHello: procedure
      .input(
        z.object({
          text: z.string(),
        })
      )
      .query(({ input }) => {
        return {
          greeting: `hello ${input.text}`,
        };
      }),
  });
}
