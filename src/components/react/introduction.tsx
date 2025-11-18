import React from 'react';
import { motion } from 'motion/react';
import type { Landing } from '../../../types/landing';
import { urlForImage } from '../../sanity/lib/url-for-image';

interface IntroductionProps {
  landingData: Landing | null;
}

export default function Introduction({ landingData }: IntroductionProps) {
  // Handle null or undefined landingData
  if (!landingData) {
    return (
      <section className="mt-10 mb-28 h-96 py-24 w-11/12 mx-auto bg-transparent flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  }

  const { title, name, image, job, location } = landingData;
  
  // Generate image URL from Sanity asset
  const imageUrl = image?.asset ? urlForImage(image.asset).width(300).height(300).fit('crop').auto('format').url() : '/sanan1.webp';
  const imageMobileUrl = image?.asset ? urlForImage(image.asset).width(200).height(200).fit('crop').auto('format').url() : '/sanan1.webp';
  
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
        <img src={imageMobileUrl} className="mx-auto rounded-full mt-4 md:hidden" alt={image?.alt || 'Portrait'} width={200} height={200} />
        <h2 className="text-4xl mt-4">
          <span className="text-deco break-keep">
            {name}
          </span>
        </h2>
        <h3 className="text-2xl md:text-3xl mt-2">
          {job} <br /> {location}
        </h3>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <img src={imageUrl} className="hidden md:block rounded-full ml-6" alt={image?.alt || 'Portrait'} width={300} height={300} />
      </motion.div>
    </motion.section>
  );
}