import React from 'react';
import localFont from '@next/font/local';

const shibuya = localFont({ src: '../../fonts/go3.ttf' });

const TITLE: Record<string, string> = {
  kawaii: 'Kawaii',
  shonen: 'Shonen',
  naruto: 'Naruto',
};

type Props = { style: string; children: React.ReactNode };

function DiffusionStyleSection({ style, children }: Props) {
  return (
    <section className="prose mx-auto mt-8">
      <h2 style={{ fontFamily: shibuya.style.fontFamily }}>{TITLE[style]}</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{children}</div>
    </section>
  );
}

export default DiffusionStyleSection;
