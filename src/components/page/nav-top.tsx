import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import SolPrice from '../HomeComponents/sol-price';

// import {W3Btn} from '@/wallet/w3-btn';
// import Notifications from '@/content/Notifications';

export function NavTop() {
  return (
    <header
      className="flex w-full justify-center"
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className="flex w-full max-w-7xl justify-center">
        <div className="inline-flex h-24 w-full items-center justify-between p-2 px-6">
          <div className='flex flex-row items-center'>

          <Link href="/" prefetch={false}>
          <Image
              src="/logo.webp"
              width={180}
              height={90}
              alt="Pump.fun Alternative"
              className="mr-10"
              />
          </Link>
          <SolPrice/>
          </div>


          <ul className="flex flex-row mt-8 mb-4">
          <a href="" className='mr-10'>About</a>
          <a href="" className='mr-10'>Advertise</a>
          <a href="" className='mr-10'>Support</a>
          <a href="">Contact</a>
        </ul>


          {/* <div className="flex justify-between gap-2">
            <Notifications />
            <div className="inline-flex items-center justify-between gap-0">
              <W3Btn />
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
}
