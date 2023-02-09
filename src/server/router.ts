import { createHelloService } from './services/hello/service';
import { createPaymentsService } from './services/payments/service';
import { router } from './trpc';

export const appRouter = router({
  hello: createHelloService(),
  payments: createPaymentsService(),
});

// export type definition of API
export type AppRouter = typeof appRouter;
