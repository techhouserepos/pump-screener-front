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
  image_uri?: string;
  name: string;
  symbol: string;
  mint: string;
  website?: string;
  twitter?: string;
  telegram?: string;
  usd_market_cap: number;
}

let interval: NodeJS.Timeout | null = null;

const RecentTokens = () => {
  const [recentTokens, setRecentTokens] = useState<Token[]>([]);
  const [newTokenMint, setNewTokenMint] = useState<string | null>(null); // Armazena o mint do token recém-adicionado

  useEffect(() => {
    const fetchTokens = () => {
      axios.get<Token[]>('/api/coins?offset=0&limit=50&sort=created_timestamp&order=DESC&includeNsfw=false')
        .then(response => {
          const tokenData = response.data.map((token) => ({
            image_uri: token.image_uri,
            name: token.name,
            symbol: token.symbol,
            twitter: token.twitter,
            website: token.website,
            telegram: token.telegram,
            mint: token.mint,
            usd_market_cap: token.usd_market_cap,
          }));

          if (recentTokens.length > 0) {
            const newToken = tokenData.find(token => !recentTokens.some(t => t.mint === token.mint));
            if (newToken) {
              setNewTokenMint(newToken.mint);
              setRecentTokens(tokenData);
              setTimeout(() => setNewTokenMint(null), 1000);
            }
          } else {
            setRecentTokens(tokenData);
          }
        })
        .catch(error => console.error('Request Error', error));
    };

    if (!interval) {
      interval = setInterval(fetchTokens, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [recentTokens]);

  return (
    <div className="mx-auto mt-8 max-w-7xl">
      <h1
        className="ml-6 text-2xl text-primary"
        data-aos="fade-right"
        data-aos-delay="100"
        data-aos-duration="1500"
      >
        Most Recent Tokens
      </h1>

      <Splide
        options={{ perPage: 7, gap: 0, navigator: false, pagination: false }}
        aria-label="Recent Tokens"
        className="wrapper hidden lg:flex justify-stretch"
        data-aos="zoom-in-up"
        data-aos-delay="100"
        data-aos-duration="1500"
      >
        {recentTokens.map((token) => (
          <SplideSlide key={token.mint}>
            <div className={`flex flex-col my-5 card ${newTokenMint === token.mint ? 'blink-effect' : ''}`}>
              <a href={`/${token.mint}`}>
                <img
                    src={token.image_uri || ''}
                    alt={token.name}
                    className="flex max-w-32 max-h-32 rounded-sm min-h-32 min-w-32 object-cover"
                  />
                <h2 className="text-maincolor mt-3 line-clamp-1 text-base">
                  {token.name}
                </h2>
              </a>
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
                  href={`https://pump.fun/${token.mint}`}
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
  );
};

export default RecentTokens;
