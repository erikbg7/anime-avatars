import { DiffusionParams } from '@/pages/payment/[sessionId]';
import { KAWAII_PROMPTS, NARUTO_PROMPTS, SHONEN_PROMPTS } from '@/utils/prompts';
import DiffusionStyleSection from './DiffusionStyleSection';

type Props = { diffusionParams: DiffusionParams };

export default function DiffusionResults({ diffusionParams }: Props) {
  return (
    <>
      <DiffusionStyleSection
        icon="💕"
        title="Kawaii Style"
        diffusionParams={diffusionParams}
        prompts={KAWAII_PROMPTS}
      />
      <DiffusionStyleSection
        icon="💥"
        title="Shonen Style"
        diffusionParams={diffusionParams}
        prompts={SHONEN_PROMPTS}
      />
      <DiffusionStyleSection
        icon="🌀"
        title="Naruto Style"
        diffusionParams={diffusionParams}
        prompts={NARUTO_PROMPTS}
      />
    </>
  );
}
