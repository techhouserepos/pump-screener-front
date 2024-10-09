import {Montserrat, Poppins, Lexend, Short_Stack, Catamaran} from 'next/font/google';

export const fontMontserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const fontPoppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const fontLexend = Lexend({
  weight: ['300', '400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const fontShortStack = Short_Stack({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-short-stack',
});


export const fontCatamaran = Catamaran({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-catamaran',
});


// export const fontPrimary = Rubik({subsets: ['latin']});
// export const lusitana = Lusitana({
//   weight: ['400', '700'],
//   subsets: ['latin'],
// });
