import React from 'react';
import { motion } from "motion/react";

export default function Footer() {
  return (
    <motion.footer
      className="h-30 bg-transparent text-white flex items-center justify-center font-silkscreen"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="text-center">
        <p className="text-lg">
          &copy; {new Date().getFullYear()} Sanan Maarouf
        </p>
      </div>
    </motion.footer>
  );
}