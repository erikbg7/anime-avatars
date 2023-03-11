type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <main className="max-w-[90%] md:max-w-[60%] mx-auto text-center">{children}</main>;
}
