import type { NavbarProps } from "../../../types/navbar";
import { DesktopNav } from "./navbar-desktop";
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
    // Sticky navbar with backdrop blur effect
    <section className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 pt-4 pb-4">
      <div className="container">
        {/* Desktop Menu - Hidden on mobile, visible on large screens */}
        <DesktopNav
          logo={logo}
          menu={menu}
          locale={locale}
          homeUrl={homeUrl}
          localizeUrl={localizeUrl}
          resumeUrl={resumeUrl}
          resumeTitle={resumeTitle}
        />

        {/* Mobile Menu - Visible only on small screens */}
        <MobileNav
          logo={logo}
          menu={menu}
          locale={locale}
          homeUrl={homeUrl}
          localizeUrl={localizeUrl}
          resumeUrl={resumeUrl}
          resumeTitle={resumeTitle}
        />
      </div>
    </section>
  );
};

export { Navbar };
