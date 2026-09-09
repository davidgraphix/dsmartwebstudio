import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const runtime = "nodejs";
export const alt = `${SITE.name} — digital products that help businesses grow`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card, generated at request time from brand tokens. */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #04061A 0%, #02167F 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#FFD014",
              color: "#02167F",
              fontSize: 34,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            D
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#fff", fontSize: 26, fontWeight: 700 }}>DSmart Web Studio</span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 16, letterSpacing: 4 }}>
              WEB · SOFTWARE · SEO
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#fff",
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              maxWidth: 900,
            }}
          >
            We build <span style={{ color: "#FFD014" }}>digital products</span> that help businesses
            grow.
          </span>
          <span style={{ color: "rgba(255,255,255,0.62)", fontSize: 26, marginTop: 24 }}>
            Websites · Web apps · Mobile apps · Dashboards · SEO
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 4, background: "#FFD014", borderRadius: 4 }} />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 20 }}>
            {SITE.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
