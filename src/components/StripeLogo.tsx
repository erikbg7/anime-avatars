import Image from 'next/image';
import lockImage from '@/public/logos/lock.png';

function StripeLogo() {
  return (
    <div className="flex flex-col text-gray-400">
      <span className="flex items-center justify-center mb-1 text-xs  font-semibold tracking-widest">
        <Image
          alt="secure payments logo"
          src={lockImage}
          className="inline w-4 h-4 filter-to-gray opacity-60 mr-1"
        />
        Secure Payments
      </span>
      <div className="flex items-center px-3 bg-brand border border-gray-400 rounded-md">
        <span className="text-xs">Powered by</span>{' '}
        <b className="text-[1.185rem] pl-1 mb-[0.2rem]">stripe</b>
      </div>
    </div>
  );
}

export default StripeLogo;
