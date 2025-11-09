"use client";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, Info, Bell } from "lucide-react";
import Icon from "@/assets/icons/HeaderIcon";
import { useCart } from "@/context/CartContext";
import CartDropdown from "@/components/products/CartDropdown";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-8 py-7">
        <div
          onClick={() => router.push("/products")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Image
            src="/octopus-secondary-logo.svg"
            alt="Octopus Logo"
            width={170}
            height={36}
            priority
          />
        </div>
        <div className="flex items-center gap-4">
          <Icon icon={Search} />
          <Icon icon={Info} />
          <Icon icon={Bell} />
          <div className="relative flex items-center" ref={dropdownRef}>
            <div
              onClick={() => {
                setCartOpen((prev) => !prev);
                setDropdownOpen(false);
              }}
              className="relative cursor-pointer pe-6"
            >
              <Icon icon={ShoppingCart} />
              {items.length > 0 && (
                <span className="absolute top-0  inline-flex items-center py-1 px-2 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-primary text-white">
                  {items.length}
                </span>
              )}
            </div>

            {cartOpen && <CartDropdown />}
            <div className="bg-light-primary w-10 h-10 flex items-center justify-center rounded-full font-semibold">
              <p className="text-primary">
                {user
                  ? `${user.firstName?.[0] || ""}${
                      user.lastName?.[0] || ""
                    }`.toUpperCase()
                  : "U"}
              </p>
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer select-none"
              onClick={() => {
                setDropdownOpen((prev) => !prev);
                setCartOpen(false);
              }}
            >
              <p className="font-normal text-base text-gray-900 ps-2">
                {user ? `${user.firstName} ${user.lastName}` : ""}
              </p>
              <svg
                className={`w-4 h-4 text-gray-900 transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 top-[60px] w-40 bg-white border border-gray-200 shadow-lg rounded-lg z-50 animate-fadeIn">
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-gray-700 cursor-pointer rounded-lg  hover:text-primary"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
