import Logo from './Logo';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <main className="relative ">
      <Logo />
      <div className="mx-auto max-w-[90%] py-20 text-center md:max-w-[60%]">{children}</div>
    </main>
  );
}
