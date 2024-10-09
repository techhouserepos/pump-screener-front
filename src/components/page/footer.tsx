import config from '@/configs/general.config';
import Image from 'next/image';

export function Footer() {
  return (
    <footer
      className="relative mx-auto flex h-20 max-w-7xl flex-col justify-between"
      id="footer"
    >
      <div className='text-center justify-center'>
        <Image
          className="relative mx-auto border-none"
          src="/logo.webp"
          alt="PumpScanner"
          width={150}
          height={150}
          priority
          data-aos="zoom-in"
          data-aos-duration="700"
        />

        <ul className="flex flex-row mx-auto justify-center mt-8 mb-4">
          <a href="" className='mr-10'>About</a>
          <a href="" className='mr-10'>Advertise</a>
          <a href="" className='mr-10'>Support</a>
          <a href="">Contact</a>
        </ul>


        <p
          className="pt-4 pb-8 text-center text-gray-200"
          data-aos="zoom-in"
          data-aos-delay="300"
          data-aos-duration="800"
        >
          &copy;2024 - {config.siteName}
        </p>
      </div>
    </footer>
  );
}
