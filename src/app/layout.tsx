import './globals.css';
import { fontLexend, fontMontserrat, fontShortStack, fontCatamaran } from '@/configs/fonts.configs';
import { cn } from '@/lib/utils';
import { NavTop } from '@/components/page/nav-top';
import { Footer } from '@/components/page/footer';
import { Providers } from '@/components/providers';
import { rootMetadata } from '@/constants/metadata/public';

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scrollbar scrollbar-track-background scrollbar-thumb-silver_lake_blue"
    >
      <body
        className={cn(
          fontMontserrat.className,
          fontLexend.className,
          fontShortStack.className,
          fontMontserrat.variable,
          fontLexend.variable,
          fontShortStack.variable,
          fontCatamaran.className,
          fontCatamaran.variable,
        )}
      >

      <div className="absolute inset-x-0 m-auto h-80 max-w-lg bg-gradient-to-tr from-indigo-400 via-teal-900 to-primary opacity-20 blur-[118px]"></div>
        <NavTop />
        <Providers>
          <div className="min-h-[calc(100vh-155px)] ">
            <div className="min-h-[calc(100vh-195px)]">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
