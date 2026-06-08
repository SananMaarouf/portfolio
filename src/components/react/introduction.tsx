import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import type { Landing } from '../../../types/landing';

interface IntroductionProps {
  landingData: Landing | null;
}


export default function Introduction({ landingData }: IntroductionProps) {
  // Handle null or undefined landingData
  if (!landingData) {
    return (
      <section className="mt-10 mb-28 min-h-[60vh] py-24 w-11/12 mx-auto bg-transparent flex items-center justify-center">
        <p>Loading...</p>
      </section>
    );
  }

  const { name, job, location } = landingData;

  return (
    <section className="
        mt-10 mb-28
        min-h-[60vh] py-24
        w-11/12 mx-auto
        bg-transparent
        flex flex-col
        justify-center 
      "
    >
      <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
        <span className="text-deco break-keep">
          {name.split(' ').map((part, i) => (
            <span key={i} className="block">
              {part}
            </span>
          ))}
        </span>
      </h1>
      <p className="mt-6 text-2xl md:text-4xl">
        {job}
      </p>
      <p className="mt-2 text-xl md:text-2xl">
        {location}
      </p>
    </section>
  );
}
