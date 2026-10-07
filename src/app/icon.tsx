import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(<FaviconMark size={32} />, { ...size });
}

export function FaviconMark({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#1b4332",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 32 32">
        <path
          fill="#faf8f5"
          fillRule="evenodd"
          d="M16 5L4.5 28h6L12.2 22h7.6L21.5 28h6L16 5zm0 7.5 2.4 6.5h-4.8L16 12.5z"
        />
      </svg>
    </div>
  );
}
