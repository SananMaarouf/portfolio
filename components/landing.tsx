import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useTranslation } from 'next-i18next';

export default function Landing() {
const { t } = useTranslation();
const name = "Sanan Maarouf";
const nameArray = name.split("");
  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="
        mt-10 mb-28
        h-96 py-24 
        w-11/12 mx-auto 
        bg-transparent
        flex flex-col md:flex-row 
        items-center justify-center 
        font-silkscreen text-center 
        md:mt-10 md:items-center md:text-left
        "
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Image src={"/sanan1.webp"} className='mx-auto rounded-full mt-4 md:hidden' alt="Portrait" width={200} height={200} />
        <h2 className="text-4xl mt-4">
        <span className="text-deco text-pretty">
          {nameArray.map((letter, index) => (
            <span
              key={index}
              className="inline-block transition-transform duration-200 hover:scale-125"
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
      </h2>
        <h3 className="text-2xl md:text-3xl mt-2">
          {t("landing.jobtitle")} <br/> {t("landing.location")}
        </h3>
      </motion.div>
      <motion.div
       initial={{ opacity: 0, y: 100 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.5, duration: 0.5 }}
     >
        <Image src={"/sanan1.webp"} className='hidden md:block rounded-full ml-6' alt="Portrait" width={300} height={300} />
      </motion.div>
    </motion.section>
  );
}