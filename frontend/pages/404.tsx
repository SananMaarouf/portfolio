import Link from 'next/link';
import Image from 'next/image';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button } from "@/components/ui/button"


export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Image 
        src={"/confused_travolta.gif"} 
        width={300} 
        height={300} 
        alt='404 gif'
        className='mx-auto'></Image>
      <h1 className='mt-6 text-xl'>404 - Page not found</h1>
     <Button asChild
        className='mt-6 bg-white hover:bg-deco text-black hover:text-white hover:scale-150 transition-all 
        duration-300 ease-in-out no-underline rounded-full'
        >
          <Link href='/'>Go back home</Link>
      </Button>
    </div>
  );
}