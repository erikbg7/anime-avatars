import Image from 'next/image';
import lockImage from '@/public/logos/lock.png';
import clsx from 'clsx';

function StripeLogo({ className }: { className?: string }) {
  return (
    <div className={clsx('flex flex-col text-gray-400', className)}>
      <span className="flex items-center justify-center mb-1 text-[0.65rem]  font-semibold tracking-widest">
        <Image
          alt="secure payments logo"
          src={lockImage}
          className="inline w-3 h-3 filter-to-gray opacity-60 mr-1"
        />
        Secure Payments
      </span>
      <div className="flex items-center px-3 bg-brand border border-gray-400 rounded-md">
        <span className="text-[0.6rem]">Powered by</span>{' '}
        <b className="text-[0.85rem] pl-1 mb-[0.1rem]">stripe</b>
      </div>
    </div>
  );
}

export default StripeLogo;
