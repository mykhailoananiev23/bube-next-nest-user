import { memo } from "react";

const LoaderSVG = () => (
  <svg
    role="img"
    width="100%"
    height="100%"
    aria-labelledby="loading-aria"
    viewBox="0 0 500 150"
    preserveAspectRatio="none"
  >
    <title id="loading-aria">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clipPath="url(#clip-path)"
      style={{ fill: "url(#fill)" }}
    ></rect>
    <defs>
      <clipPath id="clip-path">
        <rect x="2" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="1" y="65" rx="3" ry="3" width="499" height="6" />
        <rect x="0" y="83" rx="3" ry="3" width="390" height="6" />
        <rect x="0" y="188" rx="3" ry="3" width="178" height="6" />
        <circle cx="490" cy="9" r="9" />
        <circle cx="459" cy="9" r="9" />
        <rect x="0" y="37" rx="3" ry="3" width="360" height="6" />
        <rect x="411" y="37" rx="3" ry="3" width="88" height="6" />
        <rect x="0" y="103" rx="3" ry="3" width="320" height="6" />
        <rect x="2" y="129" rx="3" ry="3" width="88" height="6" />
        <rect x="411" y="129" rx="3" ry="3" width="88" height="6" />
      </clipPath>
      <linearGradient id="fill">
        <stop offset="0.599964" stopColor="#d9d9d9" stopOpacity={1}>
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="1.59996" stopColor="#ededed" stopOpacity={1}>
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="2.59996" stopColor="#d9d9d9" stopOpacity={1}>
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  </svg>
);

const Loader = () => (
  <>
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white p-6 rounded-lg mb-6">
        <LoaderSVG />
      </div>
    ))}
  </>
);

export default memo(Loader);
