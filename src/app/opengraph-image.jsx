import { ImageResponse } from "next/og";

export const alt = "Patricia Ávalos - Psicología, hipnosis clínica y neuropsicología en Curicó";
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
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, letterSpacing: 2 }}>
          PATRICIA ÁVALOS · CURICÓ
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", maxWidth: 1040, fontSize: 64, fontWeight: 800, lineHeight: 1.08 }}>
            Psicología, hipnosis clínica y neuropsicología
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#dbeafe" }}>
            Atención profesional y reserva de horas en línea
          </div>
        </div>
      </div>
    ),
    size
  );
}
