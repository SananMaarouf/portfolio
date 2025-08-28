import React from "react";
import { useTranslation } from 'next-i18next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ExperienceAccordionProps {
  experiences: string[] | any[];
  title?: string;
  className?: string;
  versionLabels?: string[]; // Custom labels for versions (e.g., ["V1", "V2", "V3"])
}

export default function ExperienceAccordion({
  experiences,
  title = "Experience",
  className = "",
  versionLabels
}: ExperienceAccordionProps) {
  const { i18n } = useTranslation();

  // Helper function to get localized content
  const getLocalizedContent = (content: any) => {
    if (!content) return '';
    if (typeof content === 'string') return content;

    // Handle i18n object structure
    const currentLocale = i18n.language || 'en';
    return content[currentLocale] || content.en || '';
  };

  if (!experiences || experiences.length === 0) {
    return null;
  }

  const getVersionLabel = (index: number): string => {
    if (versionLabels && versionLabels[index]) {
      return versionLabels[index];
    }
    return `V${index + 1}`;
  };

  return (
    <section className={`my-5 md:my-10 ${className}`}>
      <p className="text-2xl underline font-bold mb-4">
        {title}:
      </p>
      <Accordion type="single" collapsible className="mt-4">
        {experiences.map((experience, index) => (
          <AccordionItem key={index} value={`experience-${index}`}>
            <AccordionTrigger>
              {getVersionLabel(index)}
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-lg leading-relaxed whitespace-pre-wrap">
                {getLocalizedContent(experience)}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
