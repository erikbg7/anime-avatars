import { createCustomerService } from './services/customer/service';
import { createDiffusionService } from './services/diffusion/service';
import { createPaymentsService } from './services/payments/service';
import { createStorageService } from './services/storage/service';
import { router } from './trpc';

export const appRouter = router({
  customer: createCustomerService(),
  diffusion: createDiffusionService(),
  payments: createPaymentsService(),
  storage: createStorageService(),
});

// export type definition of API
export type AppRouter = typeof appRouter;
