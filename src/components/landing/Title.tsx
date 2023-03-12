import localFont from '@next/font/local';

const shibuya = localFont({ src: '../../fonts/go3.ttf' });

type Props = {
  line1: string;
  line2: string;
  line3: string;
};

function Title(props: Props) {
  return (
    <h1
      className={`flex flex-col max-w-2xl mb-6 text-5xl md:text-7xl font-semibold ${shibuya.className}`}
    >
      {props.line1}
      <span
        className={`${shibuya.className} tracking-wider text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-purple-400 to-pink-600 mt-4`}
      >
        {props.line2}
      </span>
      {props.line3}
    </h1>
  );
}

export default Title;
