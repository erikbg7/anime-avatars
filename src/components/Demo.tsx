import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

const PORTRAITS = ['/portrait_1.jpeg', '/portrait_1.jpeg', '/portrait_1.jpeg', '/portrait_1.jpeg'];

export default function Demo() {
  const [selected, setSelected] = useState<number>(1);

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
            <Image alt="portrait 1" src={portrait} fill />
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
          <Image alt="portrait 1" src="/portrait_1.jpeg" fill />
        </div>
        <div className="relative w-64 h-64 m-4 rounded-md overflow-hidden cursor-pointer">
          <Image alt="portrait 1" src="/portrait_1.jpeg" fill />
        </div>
        <div className="relative w-64 h-64 m-4 rounded-md overflow-hidden cursor-pointer">
          <Image alt="portrait 1" src="/portrait_1.jpeg" fill />
        </div>
        <div className="relative w-64 h-64 m-4 rounded-md overflow-hidden cursor-pointer">
          <Image alt="portrait 1" src="/portrait_1.jpeg" fill />
        </div>
        <div className="relative w-64 h-64 m-4 rounded-md overflow-hidden cursor-pointer">
          <Image alt="portrait 1" src="/portrait_1.jpeg" fill />
        </div>
      </div>
    </>
  );
}
