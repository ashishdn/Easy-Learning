export default function StudyFigure({ figure }) {
  return (
    <figure className="study-figure">
      <svg viewBox="0 0 330 220" role="img" aria-label={figure.caption}>
        {figure.circles?.map((c, i) => (
          <circle
            key={`c${i}`}
            cx={c.cx}
            cy={c.cy}
            r={c.r}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        ))}
        {figure.lines?.map(([x1, y1, x2, y2], i) => (
          <line
            key={`l${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="2"
          />
        ))}
        {figure.points?.map((point, i) => (
          <circle
            key={`p${i}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="currentColor"
          />
        ))}
        {figure.labels?.map((label, i) => (
          <text
            key={`t${i}`}
            x={label.x}
            y={label.y}
            fontSize="14"
            fill="currentColor"
            transform={
              label.rotate
                ? `rotate(${label.rotate} ${label.x} ${label.y})`
                : undefined
            }
          >
            {label.text}
          </text>
        ))}
      </svg>
      <figcaption>{figure.caption}</figcaption>
    </figure>
  );
}
