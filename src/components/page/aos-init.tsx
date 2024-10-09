'use client';

import {useEffect} from 'react';

import AOS from 'aos';

import 'aos/dist/aos.css';

type Props = {
  children: React.ReactNode;
};

const AosInit = ({children}: Props) => {
  useEffect(() => {
    AOS.init({
      anchorPlacement: 'top-bottom',
      mirror: true,
      offset: -100,
      once: false,
    });
  }, []);

  return children;
};

export default AosInit;
