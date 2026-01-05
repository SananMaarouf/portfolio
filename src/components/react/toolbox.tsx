import { useState } from "react";
import { motion } from "motion/react";
import { PanelTopOpen, PanelBottomOpen } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { ToolboxProps } from "../../../types/toolbox";


export default function Toolbox({ t }: ToolboxProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const backend = [
    { src: "/technologies/rails.webp", alt: "Ruby on Rails", title: "Ruby on Rails" },
    { src: "/technologies/node.webp", alt: "Nodejs", title: "Node.js" },
    { src: "/technologies/python.webp", alt: "Python", title: "Python" },
    { src: "/technologies/dart.webp", alt: "Dart", title: "Dart" },
    { src: "/technologies/Kotlin.webp", alt: "Kotlin", title: "Kotlin" },
  ];

  const frontend = [
    { src: "/technologies/typescript.webp", alt: "TypeScript", title: "TypeScript" },
    { src: "/technologies/react.webp", alt: "React", title: "React" },
    { src: "/technologies/tailwind.webp", alt: "TailwindCSS", title: "TailwindCSS" },
    { src: "/technologies/motion.webp", alt: "Motion", title: "Motion" },
    { src: "/technologies/next.svg", alt: "NextJS", title: "Next.js" },
    { src: "/technologies/vue.webp", alt: "VueJS", title: "Vue.js" },
  ];

  const cloudBaas = [
    { src: "/technologies/firebase.webp", alt: "Firebase", title: "Firebase" },
    { src: "/technologies/supabase.webp", alt: "Supabase", title: "Supabase" },
    { src: "/technologies/pocketbase.webp", alt: "Pocketbase", title: "Pocketbase" },
    { src: "/technologies/cloudflare-worker.webp", alt: "Cloudflare Workers", title: "Cloudflare Workers" },
  ];

  const deployment = [
    { src: "/technologies/vercel.webp", alt: "Vercel", title: "Vercel" },
    { src: "/technologies/netlify.webp", alt: "Netlify", title: "Netlify" },
    { src: "/technologies/pages.webp", alt: "Cloudflare Pages", title: "Cloudflare Pages" },
    { src: "/technologies/coolify.webp", alt: "Coolify", title: "Coolify" },
    { src: "/technologies/dokploy.webp", alt: "Dokploy", title: "Dokploy" },
    { src: "/technologies/github.webp", alt: "GitHub Actions", title: "GitHub Actions" },
  ];

  const databases = [
    { src: "/technologies/mysql.webp", alt: "MySQL", title: "MySQL" },
    { src: "/technologies/postgres.webp", alt: "PostgreSQL", title: "PostgreSQL" },
    { src: "/technologies/firebase.webp", alt: "Firebase Firestore", title: "Firestore" },
    { src: "/technologies/sqlite.webp", alt: "SQLite", title: "SQLite" },
  ];

  const cardClasses = `
    md:mx-1 
    flex flex-col 
    rounded-2xl p-2 font-semibold text-center
    items-center justify-center 
    border-2 border-border  
    bg-primary text-primary-foreground 
    hover:bg-secondary hover:text-secondary-foreground
    transition-all duration-300 ease-linear
    w-28 h-28 hover:scale-110
    md:w-28 md:h-32
  `;

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="
      text-foreground rounded-xl mx-auto md:mx-auto 
      flex flex-col items-center  
      flex-wrap my-10 md:items-start ml-2 xl:w-10/12">
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl md:text-4xl">{t.title}:</h2>
          {openItems.length > 0 ? (
            <button
              onClick={() => setOpenItems([])}
              className="text-sm md:text-base px-3 py-1.5 rounded-lg border-2 border-border bg-primary text-primary-foreground flex items-center gap-2"
            >
              <PanelBottomOpen className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setOpenItems(['backend', 'frontend', 'cloudbaas', 'deployment', 'databases'])}
              className="text-sm md:text-base px-3 py-1.5 rounded-lg border-2 border-border bg-primary text-primary-foreground flex items-center gap-2"
            >
              <PanelTopOpen className="w-4 h-4" />
            </button>
          )}
        </div>
        
        <Accordion type="multiple" className="w-full" value={openItems} onValueChange={setOpenItems}>
          
          {/* Backend */}
          <AccordionItem value="backend">
            <AccordionTrigger className="text-xl md:text-2xl">
              {t.backend}
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-2 flex flex-wrap gap-2 justify-center md:justify-start text-xs md:text-sm">
                {backend.map((tech, index) => (
                  <div key={index} className={cardClasses}>
                    <img src={tech.src} alt={tech.alt} width={48} height={48} className="w-8 h-8 md:w-10 md:h-10 mb-1" />
                    <p className="text-xs leading-tight wrap-break-word hyphens-auto">{tech.title}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Frontend */}
          <AccordionItem value="frontend">
            <AccordionTrigger className="text-xl md:text-2xl">
              {t.frontend}
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-2 flex flex-wrap gap-2 justify-center md:justify-start text-xs md:text-sm">
                {frontend.map((tech, index) => (
                  <div key={index} className={cardClasses}>
                    <img src={tech.src} alt={tech.alt} width={48} height={48} className="w-10 h-10 mb-1" />
                    <p className="text-xs leading-tight wrap-break-word hyphens-auto">{tech.title}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Cloud & BaaS */}
          <AccordionItem value="cloudbaas">
            <AccordionTrigger className="text-xl md:text-2xl">
              {t.cloudBaas}
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-2 flex flex-wrap gap-2 justify-center md:justify-start text-xs md:text-sm">
                {cloudBaas.map((tech, index) => (
                  <div key={index} className={cardClasses}>
                    <img src={tech.src} alt={tech.alt} width={48} height={48} className="w-8 h-8 md:w-10 md:h-10 mb-1" />
                    <p className="text-xs leading-tight wrap-break-word hyphens-auto">{tech.title}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Deployment & Hosting */}
          <AccordionItem value="deployment">
            <AccordionTrigger className="text-xl md:text-2xl">
              {t.deployment}
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-2 flex flex-wrap gap-2 justify-center md:justify-start text-xs md:text-sm">
                {deployment.map((tech, index) => (
                  <div key={index} className={cardClasses}>
                    <img src={tech.src} alt={tech.alt} width={48} height={48} className="w-8 h-8 md:w-10 md:h-10 mb-1" />
                    <p className="text-xs leading-tight wrap-break-word hyphens-auto">{tech.title}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Databases */}
          <AccordionItem value="databases">
            <AccordionTrigger className="text-xl md:text-2xl">
              {t.db}
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-2 flex flex-wrap gap-2 justify-center md:justify-start text-xs md:text-sm">
                {databases.map((tech, index) => (
                  <div key={index} className={cardClasses}>
                    <img src={tech.src} alt={tech.alt} width={48} height={48} className="w-12 h-12" />
                    <p className="text-xs leading-tight wrap-break-word hyphens-auto">{tech.title}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </motion.section>
  );
}