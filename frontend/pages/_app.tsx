import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Silkscreen, Chakra_Petch } from "next/font/google";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import { appWithTranslation } from "next-i18next";
import { BrowserView, isMobile } from 'react-device-detect';
import AnimatedCursor from "react-animated-cursor"

const silkscreen = Silkscreen({ subsets: ["latin"], weight: "400" });
const chakra_petch = Chakra_Petch({ subsets: ["latin"], weight: "400" });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>{`
        .font-silkscreen { font-family: ${silkscreen.style.fontFamily}; }
        .font-chakra { font-family: ${chakra_petch.style.fontFamily}; }
      `}</style>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow font-silkscreen">
          <Component {...pageProps} />
        </main>
        {!isMobile && (
          <BrowserView>
            <AnimatedCursor
              color="255,255,255"
              innerSize={30}
              outerSize={35}
              innerScale={1}
              outerScale={1.2}
              outerAlpha={1}
              trailingSpeed={6}
              clickables={["button", "a", "span", "ul", "img"]}
              outerStyle={{
                mixBlendMode: 'exclusion',
              }}
              innerStyle={{
                backgroundColor: 'var(--cursor-color)',
                mixBlendMode: 'exclusion'
              }}
            />
          </BrowserView>
        )}
      </div>
      <Footer />
    </>
  );
}

export default appWithTranslation(App);