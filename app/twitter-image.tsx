import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Flowkart — AI-Native Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#030303",
          color: "#e4e4eb",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(0, 240, 255, 0.15)",
            filter: "blur(100px)",
          }}
        />

        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: 16,
          }}
        >
          Flowkart
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#00f0ff",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase" as const,
          }}
        >
          AI-Native Agency
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#5a5a6e",
            marginTop: 24,
            maxWidth: 600,
            textAlign: "center" as const,
            lineHeight: 1.5,
          }}
        >
          We don&apos;t automate tasks. We architect intelligence.
        </div>
      </div>
    ),
    { ...size }
  );
}
