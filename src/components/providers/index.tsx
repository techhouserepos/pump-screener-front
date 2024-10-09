'use client';
import { Toaster } from 'sonner';
import { AosProvider } from './aos-provider';
import { BgProvider } from './bg-provider';
import { ThemeProvider } from './theme-provider';

export function Providers({children}: {children?: React.ReactNode}) {
  return (
    <ThemeProvider attribute="class">
      <BgProvider>
          <AosProvider>
            <Toaster
              pauseWhenPageIsHidden
              position="top-center"
              richColors
              theme="system"
            />
            {children}
          </AosProvider>
      </BgProvider>
    </ThemeProvider>
  );
}
