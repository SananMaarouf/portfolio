import type { NavbarProps } from "../../../types/navbar";
import { DesktopNav } from "./navbar-desktop";
import { CircularLogo } from "./circular-logo";
import { MobileNav } from "./navbar-mobile";

// Main Navbar component with responsive design
// Displays different layouts for desktop (lg+) and mobile screens
const Navbar = ({logo = {title: "Acme Corp", image: "/logo.png", alt: "Logo"},
  // Default menu structure
  menu = [{title: "Projects", url: "/projects"}, { title: "Posts", url: "/posts" }], locale = "en"}: NavbarProps) => {
  
  const homeUrl = locale === "nb" ? "/nb/" : "/";
  const localizeUrl = (url: string) => {
    if (locale === "nb" && url.startsWith("/")) {
      if (url === "/") return "/nb/"; // root
      return `/nb${url}`; // prefix for nb
    }
    return url;
  };
  const resumeUrl = locale === "nb" ? "/download/cv-no" : "/download/cv-en";
  const resumeTitle = locale === "nb" ? "CV" : "Resume";
  
  return (
    // Fixed navbar with backdrop blur effect
    <section className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
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
    </section>
  );
};

export { Navbar };
