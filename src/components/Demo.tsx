import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import portrait_1 from '@/public/demo/portrait_1.jpeg';
import portrait_2 from '@/public/demo/portrait_2.jpg';
import portrait_3 from '@/public/demo/portrait_3.jpg';
import portrait_4 from '@/public/demo/portrait_4.jpg';

import womanKawaii1 from '@/public/demo/woman/kawaii1.png';
import womanKawaii2 from '@/public/demo/woman/kawaii2.png';
import womanKawaii3 from '@/public/demo/woman/kawaii3.png';
import womanKawaii4 from '@/public/demo/woman/kawaii4.png';

import womanShonen1 from '@/public/demo/woman/shonen1.png';
import womanShonen2 from '@/public/demo/woman/shonen2.png';
import womanShonen3 from '@/public/demo/woman/shonen3.png';
import womanShonen4 from '@/public/demo/woman/shonen4.png';

import womanNaruto1 from '@/public/demo/woman/naruto1.png';
import womanNaruto2 from '@/public/demo/woman/naruto2.png';
import womanNaruto3 from '@/public/demo/woman/naruto3.png';
import womanNaruto4 from '@/public/demo/woman/naruto4.png';

const PORTRAITS = [portrait_1, portrait_2, portrait_3, portrait_4];

const DEMO = [
  {
    main: portrait_1,
    kawaii: [womanKawaii1, womanKawaii2, womanKawaii3, womanKawaii4],
    shonen: [womanShonen1, womanShonen2, womanShonen3, womanShonen4],
    naruto: [womanNaruto1, womanNaruto2, womanNaruto3, womanNaruto4],
  },
  {
    main: portrait_2,
    kawaii: [womanKawaii1, womanKawaii2, womanKawaii3, womanKawaii4],
    shonen: [womanShonen1, womanShonen2, womanShonen3, womanShonen4],
    naruto: [womanNaruto1, womanNaruto2, womanNaruto3, womanNaruto4],
  },
  {
    main: portrait_3,
    kawaii: [womanKawaii1, womanKawaii2, womanKawaii3, womanKawaii4],
    shonen: [womanShonen1, womanShonen2, womanShonen3, womanShonen4],
    naruto: [womanNaruto1, womanNaruto2, womanNaruto3, womanNaruto4],
  },
  {
    main: portrait_4,
    kawaii: [womanKawaii1, womanKawaii2, womanKawaii3, womanKawaii4],
    shonen: [womanShonen1, womanShonen2, womanShonen3, womanShonen4],
    naruto: [womanNaruto1, womanNaruto2, womanNaruto3, womanNaruto4],
  },
];

type Props = {
  src: StaticImageData;
  label: string;
  alt: string;
};

function DemoResult(props: Props) {
  return (
    <div className="relative m-2 h-24 w-24 cursor-pointer overflow-hidden rounded-md md:m-4 md:h-48 md:w-48">
      <Image alt={props.alt} src={props.src} fill className="object-cover" />
      <div className="absolute bottom-0 right-0 z-10 rounded-tl-md bg-black/50 px-2 text-sm text-white">
        {props.label}
      </div>
    </div>
  );
}

export default function Demo() {
  const [selected, setSelected] = useState<number>(1);
  const results = DEMO[selected];

  return (
    <>
      <div className="flex justify-center pt-12">
        <div className="relative m-4 h-20 w-20">
          <Image
            alt="arrow"
            src="/arrow2.png"
            fill
            className="mx-auto -rotate-[90deg] -scale-y-100 transform invert"
          />
        </div>
        <h4 className={`font-cursive text-4xl text-white`}>Click to try!</h4>
      </div>
      <div className="flex flex-wrap justify-center">
        {DEMO.map(({ main }, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={clsx(
              'relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md',
              selected === i && ' outline-3 outline outline-white'
            )}
          >
            <Image alt={`demo portrait ${i}`} src={main} fill className="object-cover" />
          </div>
        ))}
      </div>
      <div className="relative mx-auto h-40 w-40">
        <Image
          alt="curved arrow"
          src="/curved-arrow.png"
          fill
          className="mx-auto -rotate-[55deg] -scale-y-100 transform invert"
        />
      </div>
      <div className="grid grid-cols-4">
        {results.kawaii.map((result) => (
          <DemoResult alt="portrait 1" src={result} label="💕 Kawaii" />
        ))}
        {results.shonen.map((result) => (
          <DemoResult alt="portrait 1" src={result} label="💥 Shonen" />
        ))}
        {results.naruto.map((result) => (
          <DemoResult alt="portrait 1" src={result} label="🌀 Naruto" />
        ))}
      </div>
    </>
  );
}
