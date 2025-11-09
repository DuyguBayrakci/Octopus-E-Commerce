"use client";
import { useState } from "react";
import { useCategories } from "@/context/CategoryContext";
import SearchIcon from "@/assets/icons/SearchIcon";
import Button from "@/components/common/Button";

interface Props {
  onFilterChange: (categories: string[]) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function FilterSidebar({
  onFilterChange,
  search,
  onSearchChange,
}: Props) {
  const { categories } = useCategories();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    const updated = selected.includes(category)
      ? selected.filter((c) => c !== category)
      : [...selected, category];
    setSelected(updated);
    onFilterChange(updated);
  };

  return (
    <div className="h-fit">
      <div className="mb-4">
        <div className="relative flex justify-between items-center gap-2">
          <SearchIcon className="absolute left-3 top-3 w-5 h-5" />
          <input
            type="text"
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-10 py-3 text-sm text-gray-400 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:outline-none"
          />
        </div>
      </div>
      <h3 className="text-lg font-bold font-poppins text-dark mb-4 border-b border-b-[5px] border-dark pb-1">
        Kategoriler
      </h3>

      <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto custom-scrollbar">
        {categories.map((cat, i) => (
          <label
            key={cat || i}
            className="flex items-center gap-2 text-dark font-normal text-sm font-poppins capitalize cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="accent-primary-hover w-4 h-4"
            />
            {cat}
          </label>
        ))}
      </div>

      <Button
        variant="secondary"
        className="w-full"
        onClick={() => onFilterChange(selected)}
      >
        Filtrele
      </Button>
    </div>
  );
}
