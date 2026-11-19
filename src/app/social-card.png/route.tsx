import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { EVENT, EVENT_DATE } from "@/content/event";
import { HOME_PAGE } from "@/content/pages";

export const dynamic = "force-static";

const asset = async (file: string) =>
  `data:image/png;base64,${(await readFile(path.join(process.cwd(), "public/images/badge", file))).toString("base64")}`;

const GOOGLE = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

/** The link preview: event and chapter logos, date and venue, and the astronaut on a blue stage. */
export async function GET() {
  const [astronaut, eventLogo, chapterLogo] = await Promise.all([
    asset("astronaut.png"),
    asset("devfest-indore-2026.png"),
    asset("gdg-indore.png"),
  ]);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#ffffff",
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
          padding: "56px 0 60px 72px",
          width: "670px",
        }}
      >
        {/* ImageResponse uses regular img elements, not Next Image. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={chapterLogo}
          width={300}
          height={60}
          alt=""
          // The logo file has built-in left padding; pull it onto the text edge below.
          style={{ marginLeft: "-17px" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={eventLogo} width={470} height={133} alt="" />
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              fontSize: 30,
              lineHeight: 1.3,
              color: "#4c5159",
              width: "520px",
            }}
          >
            {HOME_PAGE.heroLead}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>{EVENT_DATE}</div>
          <div style={{ display: "flex", fontSize: 25, marginTop: "8px", color: "#4c5159" }}>
            {EVENT.venue.fullName}
          </div>
          <div style={{ display: "flex", fontSize: 23, marginTop: "22px", color: "#185abc" }}>
            {new URL(EVENT.links.website).hostname}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "36px",
          top: "36px",
          width: "470px",
          height: "552px",
          borderRadius: "44px",
          background: "#edf4ff",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: "56px",
            bottom: "92px",
            width: "250px",
            height: "250px",
            borderRadius: "125px",
            background: "#d7e6ff",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: "520px",
            height: "170px",
            border: "3px solid #b4cdf3",
            borderRadius: "50%",
            transform: "rotate(-24deg)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={astronaut} width={400} height={398} alt="" />
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: "62px",
            top: "92px",
            width: "22px",
            height: "22px",
            borderRadius: "11px",
            background: "#fbbc04",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: "74px",
            top: "74px",
            width: "20px",
            height: "20px",
            borderRadius: "10px",
            background: "#ea4335",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: "70px",
            bottom: "70px",
            width: "16px",
            height: "16px",
            borderRadius: "8px",
            background: "#34a853",
          }}
        />
      </div>
      <div style={{ display: "flex", position: "absolute", left: 0, bottom: 0, width: "100%" }}>
        {GOOGLE.map((color) => (
          <div
            key={color}
            style={{ display: "flex", flex: 1, height: "12px", background: color }}
          />
        ))}
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
