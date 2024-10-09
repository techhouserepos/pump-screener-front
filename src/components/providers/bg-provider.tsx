import React from 'react';

export function BgProvider({children}: {children: React.ReactNode}) {
  return (
    <div className="absolute h-full w-full bg-gradient bg-30r bg-fixed bg-right-top bg-no-repeat xs:bg-40r sm:bg-60r xl:bg-70r 2xl:bg-90r">
      {children}
    </div>
  );
}
