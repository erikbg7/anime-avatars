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
      className={`flex max-w-2xl flex-col text-4xl font-semibold md:text-7xl ${shibuya.className}`}
    >
      {props.line1}
      <span
        className={`${shibuya.className} bg-gradient-to-b from-purple-400 to-pink-600 bg-clip-text text-5xl tracking-wider text-transparent md:text-8xl`}
      >
        {props.line2}
      </span>
      {props.line3}
    </h1>
  );
}

export default Title;
