import React from 'react';
import KothTimestamp from '@/components/HomeComponents/koth-timestamp';
import MostRecentTokens from '@/components/HomeComponents/recent';
import MoreCloseToRaydium from '@/components/HomeComponents/raydium';
import GeneralTokens from '@/components/HomeComponents/general-token-list';
import { BannerTop } from '@/components/HomeComponents/banner-top';

export default function Home() {
  return (
    <div>
      <BannerTop />
      <MostRecentTokens/>
      <KothTimestamp/>
      <MoreCloseToRaydium/>
      <GeneralTokens/>
    </div>
  );
}
