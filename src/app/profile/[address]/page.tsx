"use client";
import { delay } from "@/services/utils";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProfilePageProps {
  params: { address: string },
}

interface TokenBalance {
  address: string;
  mint: string;
  balance: number;
  image_uri: string;
  symbol: string;
  name: string;
  market_cap: number;
  value: number;
  pnlSolAmount?: number;
  pnlPercent?: number;
}

interface RefPNL {
  sell: number;
  buy: number;
  pnl: number;
}

const fetchedBalances = false;
const fetchedTrades = true;
const fetched = false;

let n = 0;

export default function ProfilePage({ params }: ProfilePageProps): JSX.Element {
  const [icons, setIcons] = useState<any>()
  // const [balances, setBalances] = useState<TokenBalance[]>([]);
  // const [balancesOffset, setBalancesOffset] = useState(0);

  // const getBalance = async (owner: string, offset: number, balances: TokenBalance[]) => {
  //   return axios.get<TokenBalance[]>(`/api/balances/${owner}?limit=${offset + 10}&offset=${offset}`)
  //     .then(({ data }) => {
  //       if (!data.length) return false;
  //       balances.push(...data);
  //       return true;
  //     })
  //     .catch((err) => {
  //       console.error(`Failed fetch user ${owner} balances`, err);
  //       return false;
  //     })
  // }

  // const getBalances = async (owner: string): Promise<TokenBalance[]> => {
  //   const balances: TokenBalance[] = [];
  //   await getBalance(owner, balancesOffset, balances);
  //   return balances;
  // }

  // useEffect(() => {
  //   const balances: TokenBalance[] = [];
  //   getBalance(params.address, 0, balances)
  //     .then(() => {
  //       setBalances(balances)
  //     })
  // }, [params.address])


  // // useEffect(() => {
  // //   if (fetchedBalances) return;


  // //   getBalances(params.address)
  // //     .then((data) => {
  // //       fetchedBalances = true;
  // //       setBalances(data);
  // //     })
  // //     .catch(console.error)
  // // }, [balancesOffset, params.address]);

  // useEffect(() => {
  //   if (!balances.length || !fetchedTrades) return;
  //   fetchedTrades = false;
  //   const parseTradesOfMint = async (mint: string, offset: number, ref: RefPNL): Promise<boolean> => {
  //     return axios.get(`/api/trades/all/${mint}?limit=${offset + 500}&offset=${offset}`)
  //       .then(({ data }) => {
  //         if (!data.length) return false;
  //         data.forEach((trade: any) => {
  //           if (trade.user === params.address) {
  //             if (trade.is_buy) {
  //               ref.buy += trade.sol_amount;
  //               ref.pnl -= trade.sol_amount;
  //             } else {
  //               ref.sell += trade.sol_amount;
  //               ref.pnl += trade.sol_amount;
  //             }
  //           }
  //         });
  //         return true;
  //       })
  //       .catch((err) => {
  //         console.error(`Failed fetch trades error of mint ${mint}`, err);
  //         return false;
  //       })
  //   }
  
  //   const getMintPNL = async (mint: string): Promise<RefPNL> => {
  //     const ref: RefPNL = { pnl: 0, buy: 0, sell: 0 };
  //     let offset = 0;
  //     while (await parseTradesOfMint(mint, offset, ref)) {
  //       await new Promise((resolve) => setTimeout(resolve, 1000));
  //       offset += 500;
  //     }
  //     return ref;
  //   }
    
  //   const addTrades = async () => {
  //     const newTokens: TokenBalance[] = [];
  //     for (let i = 0; i < balances.length; ++i) {
  //       const token = { ...balances[i] };
  //       const ref = await getMintPNL(token.mint);
  //       token.pnlSolAmount = ref.pnl / 1_000_000_000 + token.value;
  //       token.pnlPercent = token.pnlSolAmount / ref.buy;
  //       newTokens.push(token);
  //     }
      
  //     console.log(newTokens);
  //   }

  //   addTrades();
  // }, [params.address, balances])
  // console.log(balances);

  useEffect(() => {
    // axios.post("/api/profile_tokens", {
    //   "userAddress": "424XEgrscRoUikMNiR5Z5dNqNnUem2Y1kkWqABJSygTc",
    //   "mints": [
    //     "3Ps5uv2XdQrndPMJk1Qos9ExxsGYVdsCPVab3vWcpump",
    //     "SVwxVbtxxyy3WKnNCo2Lcmxc99QPeabct5rVR8vpump",
    //     "VUEYB6tDaP72NuUm3siFjETkEqbv44gvm4gR5vJpump",
    //     "9EdBDo7veLQu1HkpYRV6EbyhGPdjVKSJGLqmPVWQpump",
    //     "7a8Jd6514BxMm5hFFoFSzbGoVuBgXyVgauMfcKwApump",
        
    //     "EuZfQ3mnfTKp1GJmPmkz6WPcPeQJaKgSJFKjjXJupump",
    //     "BLjHj524xEfQ9U3qzE3YBxjdm7zWBFG1mSWkk7Xpump",
    //     "9BiFGrLekJDyoCHjghvNiXdJeiab9rC5NiMTosPKtNmr",
    //     "AExt5bntQYGw4XhUSBrTEZvix5TgrYNoBhjg5sXpump",
    //     "G6BdNN9W6UPHwJWvtvdiZrVJGuMWChPoKxmRrHD7pump"
    //   ],
    // })
    //   .then(({ data }) => console.log("DATA 1", data))
    //   .catch((err) => console.error("DATA 1", err))

      // axios.post("/api/profile_tokens", {
      //   "userAddress": "9Gg8b3bKf9pPKtjEBNAVwNtC6o8aYffiWsiu3dw1vDrT",
      //   "mints": [
      //     "5MW8gWBy6FTxP393nknZE7Lver9MMDruwYASggKApump",
      //     "SVwxVbtxxyy3WKnNCo2Lcmxc99QPeabct5rVR8vpump",
      //     "F7ueA4aYL7waPjDqvRUQLUrfe6zg7w357o1qquhZpump",
      //     "2mp4Thd16YYyBn2oE2ctRdfmjrKRPz7cmrFo3ccPB4v7",
      //     "CNTLyabasMoXqHTyKJDGo37WX89VRm45Npj3c5BX6LDQ",
          
      //     "8562FwjjS3UPi7Z6DKmShmfbgGAu1PBkHqGWkNjJjAY9",
      //     "9yBJhon4jzz3PBuvACEfN7732Hwe3U56kLBE9cEKg1RM",
      //     "ERwTQP5nyFWECVTRPuwL9sEiTGtgsF4me6R7DpLm74Jp",
      //     "9SzEnkr21ohJeejsRj737qAZzAAicvXkqbvvvsCqJr19",
      //     "3DBkKiw4KxGGsaV95wrCjHBvgaV6RR6ZzpWUnHkycpvK"
      //   ]
      // })
      //   .then(({ data }) => console.log("DATA 2", data))
      //   .catch((err) => console.error("DATA 2", err))

        // axios.post("/api/profile_tokens", {
        //   "userAddress": "424XEgrscRoUikMNiR5Z5dNqNnUem2Y1kkWqABJSygTc",
        //   "mints": [
        //     "3Ps5uv2XdQrndPMJk1Qos9ExxsGYVdsCPVab3vWcpump",
        //     "SVwxVbtxxyy3WKnNCo2Lcmxc99QPeabct5rVR8vpump",
        //     "VUEYB6tDaP72NuUm3siFjETkEqbv44gvm4gR5vJpump",
        //     "9EdBDo7veLQu1HkpYRV6EbyhGPdjVKSJGLqmPVWQpump",
        //     "7a8Jd6514BxMm5hFFoFSzbGoVuBgXyVgauMfcKwApump",
            
        //     "EuZfQ3mnfTKp1GJmPmkz6WPcPeQJaKgSJFKjjXJupump",
        //     "BLjHj524xEfQ9U3qzE3YBxjdm7zWBFG1mSWkk7Xpump",
        //     "9BiFGrLekJDyoCHjghvNiXdJeiab9rC5NiMTosPKtNmr",
        //     "AExt5bntQYGw4XhUSBrTEZvix5TgrYNoBhjg5sXpump",
        //     "G6BdNN9W6UPHwJWvtvdiZrVJGuMWChPoKxmRrHD7pump"
        //   ],
        // })
        //   .then(({ data }) => console.log("DATA 3", data))
        //   .catch((err) => console.error("DATA 3", err))
  }, [])

  useEffect(() => {

    async function test() {
      n++;
      console.log(n);
      const now = Date.now();
      const limit = 200;
      let offset = 0;
      let whileTrue = true;
      const allData: any[] = [];
      while (whileTrue) {
        await axios.get(`/api/trades/all/7pL6pxVVs2bqFkJjzE2UgMmge22p3YDifjdj7TZ4epsh?limit=${limit}&offset=${offset}&minimumSize=0`)
          .then(({ data }) => {
            if (data.length) {
              allData.push(...data);
              offset += 200;
            } else {
              whileTrue = false;
            }
          });
        
      }
      console.log(allData);
      console.log(Date.now() - now)
    }
    test();
  }, [])

  useEffect(() => {
    const result = {
      "rocket": 2,
      "fire": 3,
      "poop": 3,
      "flag": 5,
      "eye": 66,
      "lastInteraction": null
    }
    setIcons(result);

  }, []);



  return <div>
    <ul>
      <div>
        {icons.rocket}
      </div>
    </ul>
  </div>
}
