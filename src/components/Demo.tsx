import clsx from 'clsx';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

import portrait_1 from '@/public/demo/portrait_1.jpeg';
import portrait_2 from '@/public/demo/portrait_2.jpg';
import portrait_3 from '@/public/demo/portrait_3.jpg';

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

import normalArrow from '@/public/demo/arrow.png';
import curvedArrow from '@/public/demo/arrow2.png';

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
];

type Props = {
  src: StaticImageData;
  label: string;
  alt: string;
};

function DemoResult(props: Props) {
  return (
    <div className="relative m-2 h-24 w-24 cursor-pointer overflow-hidden rounded-xl md:m-4 md:h-48 md:w-48">
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
      <div className="flex items-center justify-center md:pl-12">
        <Image
          alt="normal pointing arrow"
          src={normalArrow}
          className="filter-to-white mx-2 mt-2 h-16 w-20 -rotate-[56deg] -scale-y-100 transform"
        />
        <h4 className="-mt-[1.75rem] font-cursive text-3xl text-white">Click to try!</h4>
      </div>

      <div className="flex flex-wrap justify-center">
        {DEMO.map(({ main }, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={clsx(
              'relative m-2 h-24 w-24 cursor-pointer overflow-hidden rounded-xl md:m-4 md:h-32 md:w-32',
              selected === i && 'outline-3 outline outline-white'
            )}
          >
            <Image alt={`demo portrait ${i}`} src={main} fill className="object-cover" />
          </div>
        ))}
      </div>

      <Image
        alt="curved pointing arrow"
        src={curvedArrow}
        className="mx-auto -mt-2 h-28 w-28 rotate-[105deg] -scale-y-100 transform invert"
      />

      <div className="flex flex-wrap justify-center md:grid md:grid-cols-4">
        {results.kawaii.map((result, i) => (
          <DemoResult key={`kawaii-${i}`} alt="portrait 1" src={result} label="💕 Kawaii" />
        ))}
        {results.shonen.map((result, i) => (
          <DemoResult key={`shonen-${i}`} alt="portrait 1" src={result} label="💥 Shonen" />
        ))}
        {results.naruto.map((result, i) => (
          <DemoResult key={`naruto-${i}`} alt="portrait 1" src={result} label="🌀 Naruto" />
        ))}
        {results.naruto.map((result, i) => (
          <DemoResult key={`naruto-${i}`} alt="portrait 1" src={result} label="🌀 Naruto" />
        ))}
      </div>
    </>
  );
}
