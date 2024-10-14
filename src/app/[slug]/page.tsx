"use client";
import { useState, useRef, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import ThreadTradesSection from '@/components/SlugComponents/ThreadsTradeSection';
import LightweightChart from '@/components/SlugComponents/LightWeightChart';
import unprotectLinkOfCFIPFS from '@/utils/unprotectLinkOfCFIPFS';
import { FaTelegramPlane, FaRocket, FaFire, FaPoop, FaEye, FaCopy } from "react-icons/fa";
import Loading from '@/components/page/loading';
import { GlobeIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { BondingCurveResponse } from '../../../pages/api/bonding_curve';
import { delay } from '@/services/utils';
import { DexTokensResponse } from '../../../pages/api/dex_tokens';
import { HiSpeakerphone } from 'react-icons/hi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { MdOutlineCamera } from 'react-icons/md';
import { SiGooglelens } from 'react-icons/si';

interface CreatedToken {
  mint: string;
  name: string;
  symbol: string;
  description: string;
  image_uri: string;
  metadata_uri: string;
  twitter: string | null;
  telegram: string | null;
  bonding_curve: string;
  associated_bonding_curve: string;
  creator: string;
  created_timestamp: number;
  complete: boolean;
  virtual_sol_reserves: number;
  virtual_token_reserves: number;
  total_supply: number;
  website: string | null;
  show_name: boolean;
  last_trade_timestamp: number;
  king_of_the_hill_timestamp: number | null;
  market_cap: number;
  reply_count: number;
  last_reply: number;
  nsfw: boolean;
  market_id: number | null;
  inverted: null;
  is_currently_live: boolean;
  username: string;
  profile_image: string;
  usd_market_cap: number;
}

interface LikeMap {
  countMap: {
    rocket: number;
    fire: number;
    poop: number;
    eye: number;
  } | null;
  likedIconName: string | null;  
}

export default function TokenPage({ params }: { params: { slug: string } }): JSX.Element {
  const [token, setToken] = useState<TokenData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dexBannerSrc, setDexBannerSrc] = useState("");
  const [dexBoosts, setDexBoosts] = useState(0);
  const [bondingCurve, setBondingCurve] = useState<BondingCurveResponse | null>(null);
  const [getBondingCurve, setGetBondingCurve] = useState(false);
  const [createdTokens, setCreatedTokens] = useState<CreatedToken[]>([]);
  const [getCreatedTokens, setGetCreatedTokens] = useState(false);
  const [buyers, setBuyers] = useState<Set<string>>(new Set());
  const [updateBuyers, setUpdateBuyers] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [clickCounts, setClickCounts] = useState<LikeMap>({
    countMap: null,
    likedIconName: null,
  });

  const [copied, setCopied] = useState(false); // Estado para controlar o texto de cópia

  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    async function getDexBanner() {
      try {
        const { data } = await axios.get<{ src: string }>("/api/dex_banner", { params: { mint: params.slug } })
        if (data.src) {
          setDexBannerSrc(data.src);
        }
      } catch (err) {
        console.error(err)
      }
    }

    async function getDexBoosts() {
      try {
        const { data } = await axios.get<DexTokensResponse>("/api/dex_tokens", { params: { mint: params.slug } });
        const pair = data.pairs.find(({ chainId, dexId }) => chainId === "solana" && dexId === "raydium");
        if (pair?.boosts.active) {
          setDexBoosts(pair.boosts.active);
        }
      } catch (err) {
        console.error(err)
      }
    }

    async function fetchToken() {
      try {
        const { data } = await axios.get<TokenData>(`/api/coins/${params.slug}`);
        data.image_uri = unprotectLinkOfCFIPFS(data.image_uri);
        setToken(data);
        return data;
      } catch (err) {
        if (err instanceof AxiosError || err instanceof Error) {
          setError(err.message);
        } else {
          console.error(err);
          setError("Unexpected error");
        }
      }
    }

    getDexBanner();
    getDexBoosts();
    fetchToken()
      .then((data) => {
        if (data) {
          if (data.complete) {
            interval = setInterval(fetchToken, 5000);
          } else {
            setGetBondingCurve(true);
          }
          setGetCreatedTokens(true);
        }
      });
    return () => clearInterval(interval);
  }, [params.slug]);

  useEffect(() => {
    if (getBondingCurve) {
      setGetBondingCurve(false);
      axios.get<BondingCurveResponse>("/api/bonding_curve", { headers: { mint: params.slug } })
        .then(({ data }) => setBondingCurve(data))
        .catch((err) => console.error("Fail fetch bonding curve", err));
    }
  }, [params.slug, getBondingCurve]);

  useEffect(() => {
    if (token && getCreatedTokens) {
      setGetCreatedTokens(false);
      axios.get<CreatedToken[]>(`/api/coins/user-created-coins/${token.creator}?offset=0&limit=10&includeNsfw=false`)
        .then(({ data }) => {
          setCreatedTokens(data.toSorted((a, b) => b.created_timestamp - a.created_timestamp));
        })
        .catch((err) => {
          console.error("Fetch created", err);
        });
    }
  }, [getCreatedTokens, params.slug, token]);

  useEffect(() => {
    const getTrades = async () => {
      const limit = 200;
      let offset = 0;
      let keepFetching = true;
      const waitIntervalMs = 1000;
      const allBuyers = new Set<string>();
      while (keepFetching) {
        await axios.get<Trade[]>(`/api/trades/all/${params.slug}?limit=${limit}&offset=${offset}&minimumSize=0`)
          .then(({ data }) => {
            if (data.length) {
              data.forEach((trade) => {
                allBuyers.add(trade.user);
              });
              offset += limit;
            } else {
              keepFetching = false;
            }
          })
          .catch((err) => {
            console.error("Fetch trades buyers error", err);
          });
        if (waitIntervalMs) await delay(waitIntervalMs);
      }
      setBuyers((prev) => allBuyers.union(prev));
      setUpdateBuyers(true);
    }

    getTrades();
  }, [params.slug]);

  useEffect(() => {
    if (updateBuyers) {
      const fetchRecentTrades = async () => {
        try {
          const { data } = await axios.get<Trade[]>(`/api/trades/all/${params.slug}?limit=50&offset=0&minimumSize=0`);
          const buyersSet = new Set<string>();
          for (let i = 0; i < data.length; ++i) {
            buyersSet.add(data[i].user);
          }
          if (buyersSet.size) {
            setBuyers((prev) => buyersSet.union(prev));
          }
        } catch (err) {
          console.error("Fail fetching recent trades", err);
        }
      }
      const interval = setInterval(fetchRecentTrades, 3000);
      return () => clearInterval(interval);
    }
  }, [params.slug, updateBuyers]);

  useEffect(() => {
    if (!localStorage.getItem(process.env.USER_LIKE_TOKEN_ID as string)) {
      localStorage.setItem(process.env.USER_LIKE_TOKEN_ID as string, crypto.randomUUID());
    }
    const getLikes = async () => {
      axios.get<LikeMap>("/api/likes", { params: { mint: params.slug, userLikeToken: localStorage.getItem(process.env.USER_LIKE_TOKEN_ID as string) }})
      .then(({ data }) => {
        if (data.countMap) {
          setClickCounts(data);
          setSelectedIcon(data.likedIconName);
        }
      })
      .catch((err) => console.error(err))
    }
    let interval: NodeJS.Timeout | undefined;
    getLikes().finally(() => interval = setInterval(getLikes, 3000))
    return () => clearInterval(interval);
  }, [params.slug]);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token?.mint || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleIconClick = (iconName: string) => {
    if (selectedIcon === iconName) {
      setSelectedIcon(null);
    } else {
      setSelectedIcon(iconName);
    }
    axios.post<LikeMap>("/api/likes", {
      tokenMint: params.slug,
      userLikeToken: localStorage.getItem(process.env.USER_LIKE_TOKEN_ID as string),
      iconName,
    })
    .then(({ data }) => {
      setClickCounts(data)
    })
    .catch((err) => {
      console.error("Fail to handle icon click", err);
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!token) {
    return (
      <div className="relative flex max-w-7xl mx-auto flex-col place-items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center max-w-7xl mx-auto pt-1">
      <div className="w-full justify-center gap-10 mt-10 grid grid-cols-12">
        <div className="w-full h-full flex-grow col-span-9">
          <div className="flex flex-row text-sm mb-2">
            <h3 className='text-white'>Token: {token.name}</h3>
            <h3 className='text-white ml-5'>Ticker: ${token.symbol}</h3>
            <div className='flex flex-row'> 
              <h3 className='text-white ml-5'>CA: {token.mint}</h3> 
              <FaCopy className='pt-1 ml-1 text-primary cursor-pointer' onClick={handleCopy} />
            </div>
            <h3 className='text-white ml-5'>Market Cap: <span className='text-primary'>{`$${Number(bondingCurve?.marketCapUSD || token.usd_market_cap).toLocaleString()}`}</span></h3>
          </div>
          {copied && <p className="text-green-500 text-sm mt-2">Copied to Clipboard</p>}
          <LightweightChart tokenMint={token.mint} onUpdate={token.complete ? undefined : setGetBondingCurve} inRaydium={token.complete}/>
          <div ref={topRef} className="mb-4 flex justify-start">
            <span className="text-sm bg-transparent text-white mb-2 cursor-pointer" onClick={scrollToBottom}>
              [scroll down]
            </span>
          </div>
          <ThreadTradesSection tokenAddress={token.mint} creator={token.creator} />
        </div>

        {/* Token Info */}
        <div className="col-span-3 order-2 flex flex-col">
          <img src={token.image_uri || ""} alt={token.name} className="w-64 h-auto mb-4" />

          {/* Google Lens Icon Reference */}
          <a
            href={`https://lens.google.com/uploadbyurl?url=${token.image_uri}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-left mb-4 h-6 w-6"
          >
            <img src='/7123028_lens_google_icon.png' alt='Google Lens' className="cursor-pointer hover:opacity-50 transition-opacity" />
          </a>

          <h1 className="text-xl font-medium">{token.name}</h1>
          <h2 className='text-xl font-semibold text-primary'>${token.symbol}</h2>
          <p className="text-sm text mt-2">{token.description}</p>

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
      </div>
      <div ref={bottomRef} className="w-full flex justify-center mt-4">
        <span className="text-sm bg-transparent text-white cursor-pointer" onClick={scrollToTop}>
          [scroll up]
        </span>
      </div>
    </div>
  );
}
