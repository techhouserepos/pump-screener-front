'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import '@splidejs/react-splide/css';
import { FaTelegramPlane } from "react-icons/fa"; 
import { GlobeIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import './splide-customization.css'
import MarketCap from './market-cap';

interface Token {
  image_uri?: string;
  name: string;
  symbol: string;
  mint: string;
  website?:string;
  twitter?:string;
  telegram?:string;
  usd_market_cap: number;
}

const GeneralTokens = () => {
  const [generalTokens, setGeneralTokens] = useState<Token[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(()=>{
    const tokensPerPage = 50;
    const offset = currentPage * tokensPerPage;
      axios.get<Token[]>(`/api/coins?offset=${offset}&limit=50&sort=created_timestamp&order=DESC&includeNsfw=false`)
      .then(response =>{
          const tokenData = response.data.map((token)=>({
              image_uri: token.image_uri,
              name: token.name,
              symbol: token.symbol,
              twitter:token.twitter,
              website:token.website,
              telegram:token.telegram,
              mint: token.mint,
              usd_market_cap: token.usd_market_cap,
          }))
          setGeneralTokens(tokenData)
      })
      .catch(error=>console.error('Request Error', error))
  }, [currentPage]);

  return (
      <div className="mx-auto max-w-7xl mb-16">
        <h1
            className="ml-6 text-2xl text-primary"
            data-aos="fade-right"
            data-aos-delay="100"
            data-aos-duration="1500"
          >
            Most Recent Tokens
          </h1>
      
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4 wrapper"
              data-aos="zoom-in-up"
              data-aos-delay="100"
              data-aos-duration="1500"
        >
          {generalTokens.slice(0, 50).map(token => (
            <div key={token.mint} className="flex flex-col card items-center">
              <a href={`/${token.mint}`}>
                <img
                  src={token.image_uri}
                  alt={token.name}
                  className="h-40 w-40 object-cover rounded-sm"
                />
              </a>
              <h2 className="text-maincolor mt-3 line-clamp-1 text-base">
                  {token.name}
                </h2>
              <span className="text-base uppercase text-primary">
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
          ))}
        </div>
        <div className="pagination-controls flex justify-center mt-4">
        <button 
          className="mr-4 p-2 text-white bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 rounded-lg"
          onClick={() => setCurrentPage(prev => prev - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button 
          className="p-2 text-white bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 rounded-lg"
          onClick={() => setCurrentPage(prev => prev + 1)}
          disabled={generalTokens.length < 50}
        >
          Next
        </button>
      </div>
      </div>
    );
}

export default GeneralTokens