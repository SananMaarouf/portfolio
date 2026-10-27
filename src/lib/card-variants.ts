import { cva } from "class-variance-authority";

/**
 * The one card recipe shared by both carousels and the four index pages.
 * A plain module (not a component) so `.astro` frontmatter can import it too:
 *   class={cardVariants({ size: "grid" })}
 */
export const cardVariants = cva(
  "group relative flex flex-col overflow-hidden rounded-lg surface-raised transition-all duration-300 ease-linear",
  {
    variants: {
      tone: {
        primary:
          "bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground",
        card: "bg-card text-card-foreground hover:bg-foreground hover:text-background",
      },
      size: {
        carousel: "w-72 h-56 shrink-0",
        grid: "h-56",
        auto: "h-fit",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "carousel",
    },
  }
);

export const techTagVariants = cva(
  "h-6 rounded-md p-1 text-xs transition-all duration-300 bg-primary-foreground text-primary group-hover:bg-primary group-hover:text-primary-foreground"
);
