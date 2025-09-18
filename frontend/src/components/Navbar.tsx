import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface NavbarProps {
  t: {
    resume: string;
    projects: string;
    contact: string;
    platforms: string;
  };
  currentLocale: string;
  locales: string[];
  defaultLocale: string;
  cvUrl: string;
}

const menuVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export default function Navbar({ t, currentLocale, locales, defaultLocale, cvUrl }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const switchLanguage = (lang: string) => {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);

    // Remove current locale from path if it exists
    if (locales.includes(pathSegments[0])) {
      pathSegments.shift();
    }

    let newPath;
    if (lang === defaultLocale) {
      newPath = '/' + pathSegments.join('/');
    } else {
      newPath = `/${lang}/${pathSegments.join('/')}`;
    }

    // Ensure trailing slash is maintained if it was there
    if (currentPath.endsWith('/') && !newPath.endsWith('/')) {
        newPath += '/';
    }
    
    window.location.href = newPath.replace(/\/+/g, '/'); // Replace multiple slashes with a single one
    setDropdownOpen(false);
  };

  const toggleMenu = () => {
    setDropdownOpen(false);
    setIsOpen(!isOpen);
  };

  // Scroll to the projects section if present on the page. If the target exists but
  // is still hidden / has zero height (e.g. rendered but animated), retry a few times
  // before navigating to the index with a hash. Also account for the fixed navbar
  // height so the section title isn't hidden behind the nav.
  const scrollToProjects = (event?: React.MouseEvent) => {
    if (event) event.preventDefault();

    // Close mobile menu if open
    if (isOpen) setIsOpen(false);

    try {
      const currentPath = window.location.pathname;
      const pathSegments = currentPath.split('/').filter(Boolean);

      // Determine base path for current locale
      let base = '/';
      if (locales.includes(pathSegments[0])) {
        base = `/${pathSegments[0]}/`;
      }

      // If we're on the index page (with or without locale), try smooth scroll
      const isIndex = currentPath === '/' || pathSegments.length === 0 || (locales.includes(pathSegments[0]) && pathSegments.length === 1);

      const attemptScroll = (retries = 0) => {
        const el = document.getElementById('projects');
        const nav = document.querySelector('nav');
        const headerOffset = nav && (nav as HTMLElement).offsetHeight ? (nav as HTMLElement).offsetHeight : 80;

        if (el && el.offsetHeight > 0) {
          // Use exact pixel offset so title isn't hidden behind fixed nav
          const rect = el.getBoundingClientRect();
          const targetY = window.scrollY + rect.top - headerOffset - 8; // small padding
          window.scrollTo({ top: targetY, behavior: 'smooth' });
          return true;
        }

        // If element exists but has no height yet, wait a bit and retry (it may be animating in)
        if (el && retries < 12) {
          setTimeout(() => attemptScroll(retries + 1), 80);
          return false;
        }

        return null;
      };

      if (isIndex) {
        const result = attemptScroll();
        // If the element isn't present or retries eventually didn't scroll, navigate to localized index with hash
        if (result === null) {
          const url = base.endsWith('/') ? `${base}#projects` : `${base}/#projects`;
          window.location.href = url.replace(/\/+/g, '/');
        }
        return;
      }

      // Not on index — navigate to localized index with hash
      const url = base.endsWith('/') ? `${base}#projects` : `${base}/#projects`;
      window.location.href = url.replace(/\/+/g, '/');
    } catch (err) {
      // Fallback: navigate to root with hash
      window.location.href = '/#projects';
    }
  };

  return (
    <motion.nav
      className="flex h-20 mb-2 px-4 items-center w-11/12 mx-auto"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.section whileHover={{ scale: 1.1, rotate: -10 }}>
        <a href={currentLocale === defaultLocale ? '/' : `/${currentLocale}`} className='text-5xl font-silkscreen hover:text-deco'>SM</a>
      </motion.section>

      {/* mobile navbar */}
      <div className="flex justify-end w-full md:hidden ">
        <button onClick={toggleMenu} className="focus:outline-none z-50">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className='w-10 h-10  hover:text-deco'>
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className='w-10 h-10  hover:text-deco'>
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          )}
        </button>
        <AnimatePresence>
          {isOpen && (
            <section>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'tween', duration: 0.3 }}
                onClick={toggleMenu}
                className='fixed z-30 top-0 left-0 bg-black w-full h-full'>
              </motion.div>

              <motion.section
                key={"menu"}
                initial='hidden'
                animate='visible'
                exit='hidden'
                variants={menuVariants}
                transition={{ type: 'tween', duration: 0.3 }}
                className='bg-black rounded-l-3xl fixed z-40 top-0 right-0 w-3/4 h-full border-2'
              >
                <section className='flex flex-col space-y-10 py-10 px-4 mt-10 text-2xl font-silkscreen'>
                  <motion.div variants={itemVariants}>
                    <a download onClick={toggleMenu} href={cvUrl} className='hover:underline underline-offset-2 flex items-center space-x-2 hover:text-deco'>
                      <span>{t.resume}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    </a>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <a onClick={(e) => { toggleMenu(); scrollToProjects(e); }} href="/#projects" className='hover:underline underline-offset-2 hover:text-deco'>
                      {t.projects}
                    </a>
                  </motion.div>

                  <motion.div variants={itemVariants} className=''>
                    <Dialog>
                      <DialogTrigger className='font-silkscreen hover:text-deco hover:underline underline-offset-2'>{t.contact}</DialogTrigger>
                      <DialogContent className='font-silkscreen'>
                        <DialogHeader>
                          <DialogTitle>{t.platforms}</DialogTitle>
                          <DialogDescription className='flex gap-4'>
                            <a
                              href="https://www.linkedin.com/in/sanan-maarouf/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className='border-2 rounded-md p-4 bg-deco font-bold hover:underline hover:decoration-2'>
                              LinkedIn
                            </a>
                            <a
                              href="mailto:sanan.adnan97@gmail.com"
                              className='border-2 rounded-md p-4 bg-deco font-bold hover:underline hover:decoration-2'
                            >
                              Email
                            </a>
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </motion.div>

                  <motion.div variants={itemVariants} className='relative w-3/4 rounded-md'>
                    <div className='
                      flex flex-row
                      justify-between items-center
                      py-1 border-2
                      border-white 
                      hover:border-deco 
                      rounded-md'
                      onClick={toggleDropdown}>
                      <span className=' font-silkscreen px-2'>
                        {currentLocale === 'nb' ? 'Norsk 🇳🇴' : 'English 🇬🇧'}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24"
                        viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="my-auto mr-2">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                    {dropdownOpen && (
                      <div className='absolute mt-2 w-full rounded-md border-2 z-50 border-white'>
                        <button onClick={() => switchLanguage('nb')} className='text-left w-full py-2 px-1 flex justify-between rounded-md items-center hover:bg-deco'>
                          Norsk 🇳🇴
                        </button>
                        <button onClick={() => switchLanguage('en')} className='text-left w-full py-2 px-1 flex justify-between rounded-md items-center hover:bg-deco'>
                          English 🇬🇧
                        </button>
                      </div>
                    )}
                  </motion.div>
                </section>
              </motion.section>
            </section>
          )}
        </AnimatePresence>
      </div>

      {/* desktop navbar */}
      <ul className="hidden justify-end w-full md:flex font-silkscreen">
        <motion.li whileHover={{ scale: 1.1 }} className="mx-4 hover:underline underline-offset-4">
          <a download href={cvUrl} className=' flex items-center space-x-2 hover:text-deco '>
            <span>{t.resume}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
          </a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} className="mx-4 hover:underline hover:text-deco underline-offset-4">
          <a onClick={(e) => scrollToProjects(e)} href="/#projects">{t.projects}</a>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }} className="mx-4 hover:underline underline-offset-4">
          <Dialog>
            <DialogTrigger className='hover:text-deco'>{t.contact}</DialogTrigger>
            <DialogContent className='font-silkscreen'>
              <DialogHeader>
                <DialogTitle className=''>{t.platforms}</DialogTitle>
                <DialogDescription className='flex flex-col md:flex-row gap-4'>
                  <a
                    href="https://www.linkedin.com/in/sanan-maarouf/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-xl font-bold border-2 rounded-md p-3 bg-deco hover:bg-white hover:text-deco'>
                    LinkedIn
                  </a>
                  <a
                    href="mailto:sanan.adnan97@gmail.com"
                    className='text-xl font-bold border-2 rounded-md p-3 bg-deco hover:bg-white hover:text-deco'>
                    Email
                  </a>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </motion.li>
        <motion.li>
          <motion.div variants={itemVariants}>
            <div className='
              py-0.5 px-2 
              border-2 border-white
            hover:text-deco hover:border-deco 
              rounded-md' onClick={toggleDropdown}>
              <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                className=''>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            {dropdownOpen && (
              <div className='mt-2 w-32 rounded-md border-2 absolute right-16 z-50 bg-white text-deco'>
                <button onClick={() => switchLanguage('nb')} className='text-left w-full py-2 px-2 rounded-md flex justify-between items-center hover:bg-deco hover:text-white'>
                  Norsk 🇳🇴
                </button>
                <button onClick={() => switchLanguage('en')} className='text-left w-full py-2 px-2 rounded-md flex justify-between items-center hover:bg-deco hover:text-white'>
                  English 🇬🇧
                </button>
              </div>
            )}
          </motion.div>
        </motion.li>
      </ul>
    </motion.nav>
  );
}
