import { ImageResponse } from "next/og";

export const alt = "Patricia Ávalos y Tatiana Alegría — Psicología, hipnosis, neuropsicología y podología en Curicó";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "white",
          background: "linear-gradient(135deg, #0f172a 0%, #312e81 55%, #0891b2 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
          CURICÓ · FONASA · ISAPRE · PARTICULAR
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", maxWidth: 1040, fontSize: 58, fontWeight: 800, lineHeight: 1.08 }}>
            Psicología, hipnosis, neuropsicología y podología
          </div>
          <div style={{ display: "flex", gap: 32, fontSize: 26, color: "#dbeafe" }}>
            <span>Patricia Ávalos · Psicóloga</span>
            <span style={{ opacity: 0.5 }}>|</span>
            <span>Tatiana Alegría · Podóloga</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
