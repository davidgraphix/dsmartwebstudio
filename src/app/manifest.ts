import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#04061A",
    theme_color: "#02167F",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      // Opaque square lockup, for launcher slots that cannot use transparency.
      { src: "/logo-jpeg.PNG", sizes: "1254x1254", type: "image/png", purpose: "any" },
    ],
  };
}
