import { useState, useEffect } from "react";
import type { NavbarProps } from "../../../types/navbar";
import { DesktopNav } from "./navbar-desktop";
import { CircularLogo } from "./circular-logo";
import { MobileNav } from "./navbar-mobile";

const Navbar = ({logo = {title: "Acme Corp", image: "/logo.png", alt: "Logo"},
  menu = [{title: "Projects", url: "/projects"}, { title: "Posts", url: "/posts" }], locale = "en"}: NavbarProps) => {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeUrl = locale === "nb" ? "/nb/" : "/";
  const localizeUrl = (url: string) => {
    if (locale === "nb" && url.startsWith("/")) {
      if (url === "/") return "/nb/";
      return `/nb${url}`;
    }
    return url;
  };
  const resumeUrl = locale === "nb" ? "/download/cv-no" : "/download/cv-en";
  const resumeTitle = locale === "nb" ? "CV" : "Resume";

  return (
    <section className={`fixed top-0 left-0 right-0 z-40 flex justify-center transition-all duration-300 ${scrolled ? "lg:pt-3 lg:px-8" : ""}`}>
      <div className={`w-full transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 lg:rounded-2xl lg:shadow-lg" : "bg-transparent"}`}>
        <div className="container flex flex-row w-full">
          <CircularLogo
            title={logo.title}
            image={logo.image}
            alt={logo.alt}
            homeUrl={homeUrl}
          />
          {/* Desktop Menu - Hidden on mobile, visible on large screens */}
          <DesktopNav
            menu={menu}
            locale={locale}
            localizeUrl={localizeUrl}
            resumeUrl={resumeUrl}
            resumeTitle={resumeTitle}
          />

          {/* Mobile Menu - Visible only on small screens */}
          <MobileNav
            menu={menu}
            locale={locale}
            localizeUrl={localizeUrl}
            resumeUrl={resumeUrl}
            resumeTitle={resumeTitle}
          />
        </div>
      </div>
    </section>
  );
};

export { Navbar };
