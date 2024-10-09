'use client';

import dynamic from 'next/dynamic';

type Props = {
  children: React.ReactNode;
};

export const AosProvider = ({children}: Props) => {
  const AosInit = dynamic(() => import('../page/aos-init'), {ssr: true});
  return <AosInit>{children}</AosInit>;
};
