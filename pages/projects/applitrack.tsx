import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"


export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale)),
        },
    }
}


export default function Applitrack() {
    const { t } = useTranslation();
    return (
        <section className="px-5 md:px-0">
            {/* heading and image gallery */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="
                w-full h-1/2 mx-auto my-5 flex flex-col 
                border-white overflow-hidden rounded-2xl 
                border border-transparent bg-transparent md:w-3/5 lg:w-1/2
                "
            >
                <div className="w-full font-bold justify-center bg-white text-deco py-2 flex flex-col px-4 pb-2">
                    <div className="flex flex-row">
                        <div className="flex-1 w-full">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl">
                                Applitrack.no
                            </h1>
                            <p className="mt-2 text-md md:mt-4 md:text-lg lg:text-xl">
                                {t("applitrack.description")}
                            </p>
                            <p className="mt-2 text-sm md:mt-4 md:text-lg lg:text-xl">
                                {t("applitrack.date")}
                            </p>
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: 3, duration: 2 }}
                            className="w-1/6 text-2xl text-end ">
                            V3
                        </motion.div>
                    </div>
                </div>

                <Image
                    src={"/images/applitrack/at-dashboard.webp"}
                    alt={"applitrack"}
                    width={1000}
                    height={800}
                    className="w-full"
                />

            </motion.div>
            {/* content, story about the app */}
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xl font-chakra font-bold mb-10"
            >
                <section className="mx-auto my-5 md:my-10 md:w-3/5 lg:w-1/2">
                    <p>
                        {t("applitrack.story")}
                    </p>
                </section>

                <section className="mx-auto my-5 md:my-10 md:w-3/5 lg:w-1/2">
                    <p className="text-2xl underline">
                        {t("applitrack.experience.title")}:
                    </p>
                    <Accordion type="single" collapsible className="mt-4">
                        <AccordionItem value="v1">
                            <AccordionTrigger>V1</AccordionTrigger>
                            <AccordionContent>
                                {t("applitrack.experience.v1")}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="v2">
                            <AccordionTrigger>V2</AccordionTrigger>
                            <AccordionContent>
                                {t("applitrack.experience.v2")}
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="v3">
                            <AccordionTrigger>V3</AccordionTrigger>
                            <AccordionContent>
                                {t("applitrack.experience.v3")}
                                <Image
                                    src={"/images/applitrack/at-w-sankey.webp"}
                                    alt={"applitrack"}
                                    width={1000}
                                    height={800}
                                    className="w-full my-3"
                                />
                                {t("applitrack.experience.v3-2")}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
                <section className="mx-auto my-5 md:my-10 md:w-3/5 lg:w-1/2">
                    <h2 className="underline text-2xl">{t("applitrack.experience.pros.title")}</h2>
                    <ul className="list-disc list-inside mt-2 space-y-2">
                        <li>{t("applitrack.experience.pros.routing-state")}</li>
                        <li>{t("applitrack.experience.pros.performance")}</li>
                        <li>{t("applitrack.experience.pros.learning")}</li>
                    </ul>
                </section>
            </motion.div>
        </section>
    );
}