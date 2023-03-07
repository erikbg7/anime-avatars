import clsx from 'clsx';

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
        />
        <StepSection
          id={1}
          schema="pink"
          title="Upload"
          subtitle="Feed the machine model"
          description="Upload a single image to start creating the images. Everything is removed once you 
					receive the results."
        />
        <StepSection
          id={1}
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
    <section className="flex flex-col w-100% mx-auto items-center py-8">
      <span
        className={clsx('h-24 w-[1px] bg-gradient-to-b from-brand to-blue-400', {
          'to-blue-400': props.schema === 'blue',
          'to-pink-400': props.schema === 'pink',
          'to-yellow-400': props.schema === 'yellow',
        })}
      ></span>
      <span
        className={clsx(
          'flex justify-center items-center bg-gradient-to-r  rounded-full w-10 h-10 text-brand text-md font-bold',
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
          'text-transparent bg-clip-text bg-gradient-to-r mt-4 text-4xl font-semibold',
          {
            'from-blue-600 to-teal-300': props.schema === 'blue',
            'from-purple-600 to-pink-600': props.schema === 'pink',
            'from-rose-500 to-yellow-300': props.schema === 'yellow',
          }
        )}
      >
        {props.title}
      </h3>
      <h4 className="text-white text-6xl font-bold my-10 opacity-90">{props.subtitle}</h4>
      <p className="text-2xl max-w-4xl px-32 text-neutral-500 font-light text-center">
        {props.description}
      </p>
    </section>
  );
}
