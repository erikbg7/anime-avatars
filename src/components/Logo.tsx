import localFont from '@next/font/local';
import Image from 'next/image';

const go3 = localFont({ src: '../fonts/go3.ttf' });

export default function Logo() {
  return (
    <div className="fixed top-4 left-4 flex items-center glow-pulse">
      <div className="relative w-8 h-8">
        <Image src="/logo2.svg" alt="logo" fill />
      </div>
      <span className={`${go3.className} text-2xl text-white mx-3`}>ANIME AI</span>
    </div>
  );
}
