import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { EVENT, EVENT_DATE } from "@/content/event";

export const dynamic = "force-static";

export async function GET() {
  const logo = await readFile(path.join(process.cwd(), "public/gdglogo-removebg-preview.png"));
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#f7f9ff",
        color: "#202124",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "55px 0 55px 70px",
          width: "690px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            fontSize: 23,
            fontWeight: 600,
          }}
        >
          {/* ImageResponse uses regular img elements, not Next Image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${logo.toString("base64")}`}
            width={54}
            height={54}
            alt=""
          />
          <span>Google Developer Group Indore</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 102,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: "-6px",
            }}
          >
            DevFest
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: 39,
              fontWeight: 600,
              marginTop: "14px",
              color: "#185abc",
            }}
          >
            Indore <span style={{ color: "#202124" }}>·</span> {EVENT.year}
          </div>
          <div
            style={{
              display: "flex",
              width: "70px",
              height: "7px",
              borderRadius: "4px",
              background: "#fbbc04",
              marginTop: "30px",
              marginBottom: "27px",
            }}
          />
          <div style={{ display: "flex", fontSize: 25, fontWeight: 600 }}>{EVENT_DATE}</div>
          <div style={{ display: "flex", fontSize: 23, marginTop: "10px", color: "#4c5159" }}>
            {EVENT.venue.fullName}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 21, color: "#4c5159" }}>
          {new URL(EVENT.links.website).hostname}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "20px",
          top: "42px",
          width: "475px",
          height: "545px",
          borderRadius: "42px",
          background: "#dfe9ff",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "360px",
            height: "360px",
            border: "2px solid #7f9fd4",
            borderRadius: "180px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "220px",
              height: "220px",
              borderRadius: "110px",
              background: "#fbbc04",
              border: "2px solid #202124",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: "395px",
            height: "140px",
            border: "2px solid #3c5f9a",
            borderRadius: "50%",
            transform: "rotate(-28deg)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: "84px",
            top: "95px",
            width: "24px",
            height: "24px",
            borderRadius: "12px",
            background: "#4285f4",
          }}
        />
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
