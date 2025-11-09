import clsx from "clsx";

export default function SearchIcon({
  size = 20,
  color = "#94A3B8",
  className,
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx("flex-shrink-0", className)}
    >
      <path d="M9.58334 17.5C13.9556 17.5 17.5 13.9555 17.5 9.58329C17.5 5.21104 13.9556 1.66663 9.58334 1.66663C5.21108 1.66663 1.66667 5.21104 1.66667 9.58329C1.66667 13.9555 5.21108 17.5 9.58334 17.5Z" />
      <path d="M18.3333 18.3333L16.6667 16.6666" />
    </svg>
  );
}
