import { motion } from "motion/react";
import { useTranslation } from 'next-i18next';
import Image from 'next/image';


export default function Toolbox() {
  const { t } = useTranslation();
  // Arrays containing the technologies for backend, frontend, and databases
  const backend = [
    { src: "/technologies/rails.webp", alt: "Ruby on Rails", title: "Ruby on Rails" },
    { src: "/technologies/node.webp", alt: "Nodejs", title: "Nodejs" },
    { src: "/technologies/python.webp", alt: "Python", title: "Python" },
    { src: "/technologies/dart.webp", alt: "Dart", title: "Dart" },
    { src: "/technologies/Kotlin.webp", alt: "Kotlin", title: "Kotlin" },
    { src: "/technologies/firebase.webp", alt: "Firebase", title: "Firebase" },
    { src: "/technologies/supabase.webp", alt: "Supabase", title: "Supabase" },
    { src: "/technologies/pocketbase.webp", alt: "Pocketbase", title: "Pocketbase" },
    { src: "/technologies/cloudflare-worker.webp", alt: "Cloudflare Workers", title: "Cloudflare Workers" },
  ];

  const frontend = [
    { src: "/technologies/typescript.webp", alt: "TypeScript", title: "TypeScript" },
    { src: "/technologies/react.webp", alt: "React", title: "React" },
    { src: "/technologies/tailwind.webp", alt: "TailwindCSS", title: "TailwindCSS" },
    { src: "/technologies/motion.webp", alt: "Motion", title: "Motion" },
    { src: "/technologies/next.svg", alt: "NextJS", title: "Next.Js" },
    { src: "/technologies/vue.webp", alt: "VueJS", title: "Vue.Js" },
  ];

  const databases = [
    { src: "/technologies/mysql.webp", alt: "MySQL", title: "MySQL" },
    { src: "/technologies/postgres.webp", alt: "PostgreSQL", title: "PostgreSQL" },
    { src: "/technologies/firebase.webp", alt: "Firebase Firestore", title: "Firestore" },
    { src: "/technologies/sqlite.webp", alt: "SQLite", title: "SQLite" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="rounded-xl mx-auto md:mx-auto flex flex-col items-center font-silkscreen flex-wrap my-10 md:items-start ml-2">
      <div className="w-full">
        {/* Section title */}
        <h2 className="text-3xl mb-2 md:text-4xl">{t("toolbox.title")}:</h2>
        <div className="text-xl md:text-2xl flex flex-col gap-4">
          <div>
            <h3 className="underline decoration-2 mb-2">Backend:</h3>
            <div className="p-2 flex flex-wrap gap-2 text-xs md:text-sm">
              {backend.map((tech, index) => (
                <div
                  key={index}
                  className="
                    md:mx-1 
                    flex flex-col 
                    rounded-2xl p-2 font-semibold text-center
                    items-center justify-center 
                    border-2 border-white  
                    bg-neutral-100 hover:bg-deco  
                    text-deco hover:text-white 
                    transition duration-75 hover:duration-150 ease-linear
                    w-24 h-24 hover:scale-110
                    md:w-28 md:h-28 
                  ">
                  <Image src={tech.src} alt={tech.alt} width={48} height={48} className="w-10 h-10 md:w-12 md:h-12" />
                  <p>{tech.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Frontend technologies section */}
          <div>
            <h3 className="underline decoration-2 mb-2">Frontend:</h3>
            <div className="p-2 flex flex-wrap gap-2 text-xs md:text-sm">
              {/* Mapping over frontend technologies to create individual cards */}
              {frontend.map((tech, index) => (
                <div
                  key={index}
                  className="
                   md:mx-1 
                    flex flex-col 
                    rounded-2xl p-2 font-bold
                    items-center justify-center 
                    border-2 border-white  
                    bg-white hover:bg-deco  
                    text-deco hover:text-white 
                    transition duration-75 hover:duration-150 ease-linear 
                    w-24 h-24 hover:scale-110
                    md:w-28 md:h-28 
                  ">
                  <Image src={tech.src} alt={tech.alt} width={48} height={48} className="w-12 h-12" />
                  <p>{tech.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Databases section */}
          <div>
            <h3 className="underline decoration-2 mb-2">{t("toolbox.db")}</h3>
            <div className="p-2 flex flex-wrap gap-2 text-xs md:text-sm">
              {/* Mapping over database technologies to create individual cards */}
              {databases.map((tech, index) => (
                <div
                  key={index}
                  className="
                    md:mx-1 
                    flex flex-col 
                    rounded-2xl font-bold
                    items-center justify-center 
                    border-2 border-white  
                    bg-white hover:bg-deco  
                    text-deco hover:text-white
                    transition duration-75 hover:duration-150 ease-linear 
                    w-24 h-24 hover:scale-110
                    md:w-28 md:h-28 
                  ">
                  <Image src={tech.src} alt={tech.alt} width={48} height={48} className="w-12 h-12" />
                  <p>{tech.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}