"use client";

import { useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

export type FilterState = {
  search: string;
  category: string;
  material: string;
  availability: string;
  sort: "name-asc" | "availability" | "category";
};

type Props = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  categories: string[];
  materials: string[];
};

export function FilterControls({ filters, onChange, categories, materials }: Props) {
  const availabilityOptions = useMemo(
    () => ["", "В наличии", "Низкий запас", "Под заказ"],
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label htmlFor="search" className="flex items-center gap-2 text-[#9aa4ae]">
          <Search className="h-4 w-4 text-[#e9edf1]" />
          Поиск
        </Label>
        <Input
          id="search"
          placeholder="Название или категория"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <SelectField
          label="Категория"
          value={filters.category}
          onChange={(value) => onChange({ ...filters, category: value })}
          options={["", ...categories]}
        />
        <SelectField
          label="Материал"
          value={filters.material}
          onChange={(value) => onChange({ ...filters, material: value })}
          options={["", ...materials]}
        />
        <SelectField
          label="Наличие"
          value={filters.availability}
          onChange={(value) => onChange({ ...filters, availability: value })}
          options={availabilityOptions}
        />
        <SelectField
          label="Сортировка"
          value={filters.sort}
          onChange={(value) => onChange({ ...filters, sort: value as FilterState["sort"] })}
          options={[
            { label: "По названию", value: "name-asc" },
            { label: "По наличию", value: "availability" },
            { label: "По категории", value: "category" },
          ]}
        />
      </div>

      <div className="flex items-center gap-2 text-xs text-[#9aa4ae]">
        <SlidersHorizontal className="h-4 w-4 text-[#e9edf1]" />
        Локальные фильтры (готово к CMS).
      </div>
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: (string | { label: string; value: string })[];
};

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-[#9aa4ae]">{label}</Label>
      <div className="relative">
        <select
          className="w-full appearance-none rounded-lg border border-[#1c2633] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-[#e9edf1] transition focus:border-[#f1f2f5] focus:outline-none focus:ring-2 focus:ring-[#f1f2f5]/50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) =>
            typeof opt === "string" ? (
              <option key={opt || "all"} value={opt}>
                {opt ? opt : "Все"}
              </option>
            ) : (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ),
          )}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa4ae]">
          ▾
        </span>
      </div>
    </div>
  );
}
