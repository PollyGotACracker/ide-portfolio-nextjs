export default function Coding({ className, size = "800px" }: { className?: string; size?: string | number; }) {
  const url = "localhost:3000";
  const blocks = [
    [95.2, 162.18], [153.68, 162.18], [270.616, 162.18], [329.12, 162.18], [446.032, 162.18],
    [36.728, 220.652], [95.2, 220.652], [212.144, 220.652], [329.12, 220.652], [387.6, 220.652], [446.032, 220.652],
    [36.728, 279.116], [153.68, 279.116], [212.144, 279.116], [270.616, 279.116], [329.088, 279.116], [387.6, 279.116], [446.032, 279.116],
    [36.728, 337.596], [95.2, 337.596], [212.144, 337.596], [270.616, 337.596], [329.12, 337.596], [446.032, 337.596],
  ];

  return (
    <svg className={className ?? ""} style={{ width: size, height: "auto" }} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-5 47 522 418">
      {/* browser tab background */}
      <path
        d="M 11.5 57.332 C 5 57.332 0 62.332 0 68.832 L 0 105.06 L 512 105.06 L 512 68.832 C 512 62.332 507 57.332 500.5 57.332 Z"
        fill="var(--border-color)"
        stroke="none"
      />
      {/* browser line */}
      <path
        d="M 11.5 57.332 C 5 57.332 0 62.332 0 68.832 L 0 454.668 L 512 454.668 L 512 68.832 C 512 62.332 507 57.332 500.5 57.332 Z"
        stroke="var(--border-color)"
        strokeWidth="5"
        fill="transparent"
        strokeLinejoin="round"
      />
      {/* circles */}
      <circle fill="var(--primary)" cx="44.192" cy="81.196" r="9.784" />
      <circle fill="var(--primary-light)" cx="70.968" cy="81.196" r="9.784" />
      <circle fill="#939393" cx="97.736" cy="81.196" r="9.784" />
      {/* address bar background */}
      <polygon fill="var(--background-main)" points="443.52,98.06 155.96,98.06 175.08,64.716 462.656,64.716" />
      {/* address */}
      <g>
        <text x="185" y="88" fontSize="16" fill="var(--border-color-secondary)">{url}</text>
      </g>
      {/* bottoms */}
      <g fill="var(--border-color)">
        <polygon points="0,423.58 82.856,423.58 113.944,454.66 0,454.66" />
        <polygon points="512,423.58 429.144,423.58 398.056,454.66 512,454.66" />
      </g>
      {/* blocks */}
      <g>
        {blocks.map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="29.232" height="29.232" fill="var(--border-color)" opacity="0.1">
            <animate
              attributeName="opacity"
              values="0.1;0.9;0.1"
              dur={`${2 + (i * 0.5) % 3}s`}
              begin={`${(i * 1.5) % 4}s`}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
            />
          </rect>
        ))}
      </g>
      {/* </> */}
      <g stroke="var(--border-color)" opacity="0.8" fill="none" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round">
        <path d="M200.688,217.48 L81.4,270.412 L200.688,323.344" strokeDasharray="500" strokeDashoffset="500">
          <animate attributeName="stroke-dashoffset" from="500" to="0" dur="0.8s" fill="freeze" />
        </path>
        <path d="M284.84,194 L231.656,347" strokeDasharray="500" strokeDashoffset="500">
          <animate attributeName="stroke-dashoffset" from="500" to="0" dur="0.6s" begin="0.8s" fill="freeze" />
        </path>
        <path d="M311.824,217.48 L431.112,270.412 L311.824,323.344" strokeDasharray="500" strokeDashoffset="500">
          <animate attributeName="stroke-dashoffset" from="500" to="0" dur="0.8s" begin="1.4s" fill="freeze" />
        </path>
      </g>
    </svg>
  );
}