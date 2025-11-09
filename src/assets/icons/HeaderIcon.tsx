import { LucideIcon } from "lucide-react";

interface IconProps {
  icon: LucideIcon;
  className?: string;
}

export default function Icon({ icon: Icon, className = "" }: IconProps) {
  return (
    <Icon
      className={`w-6 h-6 text-gray-400 cursor-pointer hover:text-primary transition ${className}`}
    />
  );
}
