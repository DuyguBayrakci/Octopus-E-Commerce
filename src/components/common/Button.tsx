"use client";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";
import clsx from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  isAddToCart?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className,
  isAddToCart = false,
  onClick,
  ...props
}: Props) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const base =
    "relative overflow-hidden transition-all duration-500 ease-in-out cursor-pointer text-sm rounded-lg py-3 flex items-center justify-center h-11";

  const variants = {
    primary: "bg-primary hover:bg-primary-hover font-semibold text-white",
    secondary: "bg-gray-900 hover:bg-gray-700 font-medium text-white",
    outline:
      "border border-[#00A651] text-[#00A651] hover:bg-[#00A651] hover:text-white",
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAddToCart) {
      setLoading(true);
      await onClick?.(e);
      setLoading(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } else {
      onClick?.(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={clsx(
        base,
        variant === "primary"
          ? added
            ? "bg-orange-600 hover:bg-orange-400 text-white"
            : "bg-primary hover:bg-primary-hover text-white"
          : variants[variant],
        className
      )}
      {...props}
    >
      <span
        className={clsx(
          "absolute inset-0 flex items-center justify-center transition-all duration-500",
          added ? "translate-y-[-100%] opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        {loading ? "Ekleniyor..." : children}
      </span>

      <span
        className={clsx(
          "absolute inset-0 flex items-center justify-center transition-all duration-500",
          added ? "translate-y-0 opacity-100" : "translate-y-[100%] opacity-0"
        )}
      >
        Sepete Eklendi
      </span>
    </button>
  );
}
