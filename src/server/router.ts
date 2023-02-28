import { createDiffusionService } from './services/diffusion/service';
import { createPaymentsService } from './services/payments/service';
import { router } from './trpc';

export const appRouter = router({
  payments: createPaymentsService(),
  diffusion: createDiffusionService(),
});

// export type definition of API
export type AppRouter = typeof appRouter;
