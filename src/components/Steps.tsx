import clsx from 'clsx';
import Image from 'next/image';
import VisaLogo from './VisaLogo';
import lockImage from '@/public/logos/lock.png';
import MasterCardLogo from './MasterCardLogo';
import StripeLogo from './StripeLogo';

export default function Steps() {
  return (
    <div>
      <div>
        <StepSection
          id={1}
          schema="blue"
          title="Payment"
          subtitle="Wake up the Artificial Intelligence"
          description="Pay securely to start the process, we use Stripe to achive the maximum security and
            liability in your payments."
        >
          <CreditCard />
        </StepSection>
        <StepSection
          id={2}
          schema="pink"
          title="Upload"
          subtitle="Feed the machine model"
          description="Upload a single image to start creating the images. Everything is removed once you 
					receive the results."
        />
        <StepSection
          id={3}
          schema="yellow"
          title="Receive"
          subtitle="Download the amazing results"
          description="Get 15 different images in 5 anime styles to use in your socials. We are 100% sure 
					you will love them."
        />
      </div>
    </div>
  );
}

type StepSectionProps = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  schema: 'blue' | 'pink' | 'yellow';
  children?: React.ReactNode;
};

function StepSection(props: StepSectionProps) {
  return (
    <section className="mx-auto flex flex-col items-center p-6">
      <span
        className={clsx('h-24 w-[1px] bg-gradient-to-b from-brand to-blue-400', {
          'to-blue-400': props.schema === 'blue',
          'to-pink-400': props.schema === 'pink',
          'to-yellow-400': props.schema === 'yellow',
        })}
      ></span>
      <span
        className={clsx(
          'text-md flex h-10 w-10  items-center justify-center rounded-full bg-gradient-to-r font-bold text-brand',
          {
            'from-blue-600 to-teal-300': props.schema === 'blue',
            'from-purple-600 to-pink-700': props.schema === 'pink',
            'from-rose-500 to-yellow-300': props.schema === 'yellow',
          }
        )}
      >
        {props.id}
      </span>
      <h3
        className={clsx(
          'mt-4 bg-gradient-to-r bg-clip-text text-4xl font-semibold text-transparent',
          {
            'from-blue-600 to-teal-300': props.schema === 'blue',
            'from-purple-600 to-pink-600': props.schema === 'pink',
            'from-rose-500 to-yellow-300': props.schema === 'yellow',
          }
        )}
      >
        {props.title}
      </h3>
      <h4 className="my-10 text-center text-4xl font-bold text-white opacity-90 sm:text-5xl md:text-6xl">
        {props.subtitle}
      </h4>
      <p className="mb-12 max-w-4xl text-center text-2xl font-light text-neutral-500 md:px-32">
        {props.description}
      </p>
      {props.children || null}
    </section>
  );
}

function CreditCard() {
  return (
    <div className="text-white">
      <div className="relative mx-auto flex w-72 flex-col rounded-lg bg-slate-800 px-6 py-4">
        <span className="mb-2 text-right font-bold ">CREDIT CARD</span>
        <div className="grid w-16 grid-cols-3 gap-1 overflow-hidden rounded-md">
          <div className="grid grid-rows-3 gap-1">
            <div className="h-3 bg-gray-400/30"></div>
            <div className="h-3 bg-gray-400/30"></div>
            <div className="h-3 bg-gray-400/30"></div>
          </div>

          <div className="bg-gray-400/30"></div>

          <div className="grid grid-rows-3 gap-1">
            <div className="h-3 bg-gray-400/30"></div>
            <div className="h-3 bg-gray-400/30"></div>
            <div className="h-3 bg-gray-400/30"></div>
          </div>
        </div>
        <div className="my-2 flex justify-between bg-gradient-to-r from-blue-600 to-teal-300 bg-clip-text font-mono text-lg tracking-widest text-transparent">
          <span>1234</span>
          <span>5678</span>
          <span>****</span>
          <span>****</span>
        </div>
        <div className="my-2 flex items-center justify-between">
          <div className="bg-gradient-to-r from-blue-600 to-teal-300 bg-clip-text text-transparent">
            John Doe
          </div>
          <VisaLogo />
          {/* <VisaLogo className="absolute bottom-0 right-0" /> */}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-6 py-12 text-center">
        <VisaLogo className="filter-to-gray h-20 w-16" />
        <StripeLogo />
        <MasterCardLogo className="filter-to-gray h-16 w-16 opacity-40" />
      </div>
    </div>
  );
}
