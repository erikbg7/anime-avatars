import { createHelloService } from './services/hello/service';
import { router } from './trpc';

export const appRouter = router({
  hello: createHelloService(),
});

// export type definition of API
export type AppRouter = typeof appRouter;
