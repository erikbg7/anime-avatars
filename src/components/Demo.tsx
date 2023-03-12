import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import portrait_1 from '@/public/demo/portrait_1.jpeg';
import portrait_2 from '@/public/demo/portrait_2.jpg';
import portrait_3 from '@/public/demo/portrait_3.jpg';
import portrait_4 from '@/public/demo/portrait_4.jpg';

const PORTRAITS = [portrait_1, portrait_2, portrait_3, portrait_4];

export default function Demo() {
  const [selected, setSelected] = useState<number>(1);
  const demoImage = PORTRAITS[selected];

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
        {PORTRAITS.map((portrait, i) => (
          <div
            key={i}
            onClick={() => setSelected(i)}
            className={clsx(
              'relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md',
              selected === i && ' outline-3 outline outline-white'
            )}
          >
            <Image alt={`demo portrait ${i}`} src={portrait} fill className="object-cover" />
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
      <div className="flex max-w-5xl flex-wrap justify-center">
        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">💕 Kawaii</div>
        </div>
        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">💕 Kawaii</div>
        </div>
        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">💕 Kawaii</div>
        </div>

        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">🤖 Mecha</div>
        </div>
        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">🤖 Mecha</div>
        </div>
        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">🤖 Mecha</div>
        </div>

        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">🤖 Mecha</div>
        </div>
        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">🤖 Mecha</div>
        </div>
        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">🤖 Mecha</div>
        </div>

        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">🤖 Mecha</div>
        </div>
        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">🤖 Mecha</div>
        </div>
        <div className="relative m-4 h-32 w-32 cursor-pointer overflow-hidden rounded-md">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
          <div className="absolute z-30 bg-black/50 px-2 text-white">🤖 Mecha</div>
        </div>
      </div>
    </>
  );
}
