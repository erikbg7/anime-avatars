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
        <div className="relative w-20 h-20 m-4">
          <Image
            alt="arrow"
            src="/arrow2.png"
            fill
            className="invert transform -scale-y-100 -rotate-[90deg] mx-auto"
          />
        </div>
        <h4 className={`font-cursive text-4xl text-white`}>Click to try!</h4>
      </div>
      <div className="flex justify-center">
        {PORTRAITS.map((portrait, i) => (
          <div
            onClick={() => setSelected(i)}
            className={clsx(
              'relative w-32 h-32 m-4 rounded-md overflow-hidden cursor-pointer',
              selected === i && ' outline outline-3 outline-white'
            )}
          >
            <Image alt={`demo portrait ${i}`} src={portrait} fill className="object-cover" />
          </div>
        ))}
      </div>
      <div className="relative w-40 h-40 mx-auto">
        <Image
          alt="curved arrow"
          src="/curved-arrow.png"
          fill
          className="invert transform -scale-y-100 -rotate-[55deg] mx-auto"
        />
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="relative w-64 h-64 m-4 rounded-md overflow-hidden cursor-pointer">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
        </div>
        <div className="relative w-64 h-64 m-4 rounded-md overflow-hidden cursor-pointer">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
        </div>
        <div className="relative w-64 h-64 m-4 rounded-md overflow-hidden cursor-pointer">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
        </div>
        <div className="relative w-64 h-64 m-4 rounded-md overflow-hidden cursor-pointer">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
        </div>
        <div className="relative w-64 h-64 m-4 rounded-md overflow-hidden cursor-pointer">
          <Image alt="portrait 1" src={demoImage} fill className="object-cover" />
        </div>
      </div>
    </>
  );
}
