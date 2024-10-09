'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { FaTelegramPlane } from "react-icons/fa";
import { GlobeIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import './splide-customization.css';
import MarketCap from './market-cap';

interface Token {
  mint: string;
  image_uri?: string;
  logo?: string;
  name: string;
  symbol: string;
  address: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  usd_market_cap: number;
}

const KothTimestamp = () => {
  const [kothTokens, setKothTokens] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokens = () => {
      axios.get<Token[]>('/api/last_koth')
        .then(response => {
          const tokenData = response.data.map((token) => ({
            logo: token.logo,
            name: token.name,
            symbol: token.symbol,
            twitter: token.twitter,
            website: token.website,
            telegram: token.telegram,
            address: token.address,
            mint: token.mint,
            usd_market_cap: token.usd_market_cap,
          }));
          setKothTokens(tokenData);
        })
        .catch(error => console.error('Request Error', error));
    };

    // 1st function call
    fetchTokens();

    // Refresh function each 10 seconds
    const intervalId = setInterval(fetchTokens, 10000);

    // Clear interval
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl">
        <h1
          className="ml-6 text-2xl text-primary"
          data-aos="fade-right"
          data-aos-delay="100"
          data-aos-duration="1500"
        >
          Last King of the Hill
        </h1>

        <Splide
          options={{ perPage: 7, gap: 0, navigator: false, pagination: false }}
          aria-label="King of The Hill"
          className="wrapper hidden lg:flex justify-stretch"
          data-aos="zoom-in-up"
          data-aos-delay="100"
          data-aos-duration="1500"
        >
          {kothTokens.map(token => (
            <SplideSlide key={token.address}>
              <div className="flex flex-col card my-5">
                <a href={`/${token.address}`}>
                  <img
                    src={token.logo}
                    alt={token.name}
                    className="flex max-w-32 max-h-32 rounded-sm min-h-32 min-w-32 object-cover"
                  />
                </a>
                <h2 className="text-maincolor mt-3 line-clamp-1 text-base">
                  {token.name}
                </h2>
                <span className="text-base uppercase text-primary">
                  {' '}
                  ${token.symbol}
                </span>

                <MarketCap value={token.usd_market_cap} />

                <div className="mt-4 flex flex-row items-center gap-2">
                  {token.twitter && (
                    <a href={token.twitter} target="_blank" rel="nofollow">
                      <TwitterLogoIcon className="h-5 w-5 hover:text-primary" />
                    </a>
                  )}

                  {token.telegram && (
                    <a href={token.telegram} target="_blank" rel="nofollow">
                      <FaTelegramPlane className="h-5 w-5 hover:text-primary" />
                    </a>
                  )}

                  {token.website && (
                    <a href={token.website} target="_blank" rel="nofollow">
                      <GlobeIcon className="h-5 w-5 hover:text-primary" />
                    </a>
                  )}

                  <a
                    href={`https://pump.fun/${token.address}`}
                    target="_blank"
                    rel="nofollow"
                  >
                    <img
                      src="/logo-pumpfun.webp"
                      alt="pumpfun"
                      className="h-5 w-5 hover:opacity-70"
                    />
                  </a>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </>
  );
};

export default KothTimestamp;
