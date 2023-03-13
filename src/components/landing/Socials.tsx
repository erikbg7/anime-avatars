import Image from 'next/image';

import techCrunchLogo from '@/public/socials/techcrunch.png';
import stabilityLogo from '@/public/socials/stability-ai.png';
import fstoppersLogo from '@/public/socials/fstoppers.png';
import tiktokLogo from '@/public/socials/tiktok.png';
import instagramLogo from '@/public/socials/instagram.png';

type Props = {
  label: string;
};

function Socials(props: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center">
      <p className="mr-6 text-xs opacity-50">{props.label}</p>
      <Image
        alt="techcrunch social logo"
        className="filter-to-white my-2 mr-6 h-4 w-auto md:h-6"
        src={techCrunchLogo}
      />
      <Image
        alt="stability social logo"
        className="filter-to-white my-2 mr-6 h-4 w-auto md:h-6"
        src={stabilityLogo}
      />
      <Image
        alt="fstoppers social logo"
        className="filter-to-white my-2 mr-6 h-4 w-auto md:h-6"
        src={fstoppersLogo}
      />
      <Image
        alt="tiktok social logo"
        className="filter-to-white my-2 mr-6 h-4 w-auto md:h-6"
        src={tiktokLogo}
      />
      <Image
        alt="instagram social logo"
        className="filter-to-white mr-6 mt-3 mb-2 h-4 w-auto md:h-6"
        src={instagramLogo}
      />
    </div>
  );
}

export default Socials;
