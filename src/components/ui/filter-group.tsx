"use client";

import { useState, useCallback } from "react";
import {
  Search,
  SlidersHorizontal,
  Check,
  ArrowUpDown,
  Square,
  CheckSquare,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type SortOption = "latest" | "oldest" | "name-asc" | "name-desc";

export type CategoryOption<T extends string> = {
  label: string;
  value: T;
};

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Latest First", value: "latest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Name A → Z", value: "name-asc" },
  { label: "Name Z → A", value: "name-desc" },
];

type SearchFilterGroupProps<T extends string> = {
  search: string;
  onSearchChange: (value: string) => void;
  categories: T[];
  onCategoriesChange: (value: T[]) => void;
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
  categoryOptions: readonly CategoryOption<T>[];
  className?: string;
};

export function SearchFilterGroup<T extends string>({
  search,
  onSearchChange,
  categories: selectedCategories,
  onCategoriesChange,
  sort,
  onSortChange,
  categoryOptions,
  className,
}: SearchFilterGroupProps<T>) {
  const [open, setOpen] = useState(false);

  const activeFiltersCount =
    selectedCategories.length + (sort !== "latest" ? 1 : 0);

  const handleCategoryToggle = useCallback(
    (value: T) => {
      if (selectedCategories.includes(value)) {
        onCategoriesChange(selectedCategories.filter((c) => c !== value));
      } else {
        onCategoriesChange([...selectedCategories, value]);
      }
    },
    [selectedCategories, onCategoriesChange]
  );

  const handleSortSelect = useCallback(
    (value: SortOption) => {
      onSortChange(value);
    },
    [onSortChange]
  );

  return (
    <div className={cn("flex items-center rounded-md border", className)}>
      <div className="flex items-center flex-1 px-2 gap-1.5">
        <Search className="size-3 text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground py-1.5 min-w-0"
        />
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-1 px-2 py-1.5 text-xs font-medium transition-colors",
              "bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90"
            )}
          >
            <SlidersHorizontal className="size-3" />
            <span className="hidden sm:inline">Filter</span>
            {activeFiltersCount > 0 && (
              <span className="flex items-center justify-center size-3.5 rounded-full bg-background text-foreground text-[9px] font-semibold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-44 p-0" sideOffset={6}>
          <div className="p-1.5">
            <p className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
              Category
            </p>
            {categoryOptions.map((cat) => {
              const isSelected = selectedCategories.includes(cat.value);
              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryToggle(cat.value)}
                  className={cn(
                    "flex items-center gap-2 w-full px-2 py-1 text-xs rounded transition-colors",
                    isSelected ? "bg-accent font-medium" : "hover:bg-accent/50"
                  )}
                >
                  {isSelected ? (
                    <CheckSquare className="size-3" />
                  ) : (
                    <Square className="size-3 text-muted-foreground" />
                  )}
                  {cat.label}
                </button>
              );
            })}
          </div>

          <Separator />

          <div className="p-1.5">
            <p className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
              <ArrowUpDown className="size-2.5" />
              Sort
            </p>
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSortSelect(opt.value)}
                className={cn(
                  "flex items-center justify-between w-full px-2 py-1 text-xs rounded transition-colors",
                  sort === opt.value
                    ? "bg-accent font-medium"
                    : "hover:bg-accent/50"
                )}
              >
                {opt.label}
                {sort === opt.value && <Check className="size-3" />}
              </button>
            ))}
          </div>

          {activeFiltersCount > 0 && (
            <>
              <Separator />
              <div className="p-1.5">
                <button
                  onClick={() => {
                    onCategoriesChange([]);
                    onSortChange("latest");
                  }}
                  className="w-full px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-accent/50"
                >
                  Reset filters
                </button>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
