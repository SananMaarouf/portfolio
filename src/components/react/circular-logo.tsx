import { useEffect, useState } from "react";

interface CircularLogoProps {
  title: string;
  image?: string;
  alt?: string;
  homeUrl: string;
}

export const CircularLogo = ({ title, image, alt, homeUrl }: CircularLogoProps) => {
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = scrollY * 0.5; // Adjust multiplier for rotation speed
      setScrollRotation(rotation);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a href={homeUrl} className="group shrink-0">
      <div className="relative w-32 h-24 flex items-center justify-center">
        {/* SVG Circular text - rotates on scroll */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `rotate(${scrollRotation}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <defs>
            <path
              id="circlePath"
              d="M 100, 100
                 m -75, 0
                 a 75,75 0 1,1 150,0
                 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text className="fill-primary text-2xl font-bold">
            <textPath
              href="#circlePath"
              startOffset="0%"
              style={{ fontSize: '24px', fontWeight: 'bold' }}
            >
              {title}
            </textPath>
          </text>
        </svg>

        {/* Center logo image - stays fixed */}
        {image && (
          <img
            src={image}
            alt={alt || title}
            className="h-16 w-16 rounded-full relative z-10 group-hover:scale-110 transition-transform duration-300"
          />
        )}
      </div>
    </a>
  );
};
