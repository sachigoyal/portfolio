"use client";

import { useState, useMemo } from "react";
import { BlogCard } from "./blog-card";
import { SearchFilterGroup, type SortOption } from "@/components/ui/filter-group";
import type { Blogs } from "#site/content";
import type { BlogCategory } from "../../../velite.config";

type BlogCategoryValue = BlogCategory | "featured";

const blogCategoryOptions = [
  { label: "Featured", value: "featured" },
  { label: "Development", value: "development" },
  { label: "Open Source", value: "open-source" },
  { label: "Tutorial", value: "tutorial" },
  { label: "Thoughts", value: "thoughts" },
  { label: "UI Component", value: "ui-component" },
] as const;

type BlogsListProps = {
  blogs: Blogs[];
};

export function BlogsList({ blogs }: BlogsListProps) {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<BlogCategoryValue[]>([]);
  const [sort, setSort] = useState<SortOption>("latest");

  const filteredAndSortedBlogs = useMemo(() => {
    let result = [...blogs];

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(searchLower) ||
          b.excerpt.toLowerCase().includes(searchLower) ||
          b.tags.some((t) => t.toLowerCase().includes(searchLower))
      );
    }

    if (categories.length > 0) {
      const hasFeatured = categories.includes("featured");
      const otherCategories = categories.filter((c) => c !== "featured");

      result = result.filter((b) => {
        const matchesFeatured = hasFeatured && b.featuredRank > 0;
        const matchesCategory = (otherCategories as string[]).includes(
          b.category
        );
        return matchesFeatured || matchesCategory;
      });
    }

    switch (sort) {
      case "latest":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [blogs, search, categories, sort]);

  const blogsByYear = useMemo(() => {
    if (sort === "name-asc" || sort === "name-desc") {
      return null;
    }

    return filteredAndSortedBlogs.reduce(
      (acc, b) => {
        const year = new Date(b.date).getFullYear().toString();
        if (!acc[year]) acc[year] = [];
        acc[year].push(b);
        return acc;
      },
      {} as Record<string, Blogs[]>
    );
  }, [filteredAndSortedBlogs, sort]);

  const years = blogsByYear
    ? Object.keys(blogsByYear).sort((a, b) =>
        sort === "oldest" ? +a - +b : +b - +a
      )
    : null;

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-6">
        <h1 className="font-semibold text-xl md:text-2xl">Blogs</h1>
        <SearchFilterGroup
          search={search}
          onSearchChange={setSearch}
          categories={categories}
          onCategoriesChange={setCategories}
          sort={sort}
          onSortChange={setSort}
          categoryOptions={blogCategoryOptions}
        />
      </div>

      <div className="flex flex-col mt-4 gap-6">
        {filteredAndSortedBlogs.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No posts found.
          </p>
        ) : years && blogsByYear ? (
          years.map((year) => (
            <div key={year}>
              <p className="text-xs text-muted-foreground font-medium mb-1">
                {year}
              </p>
              <div className="flex flex-col">
                {blogsByYear[year].map((b) => (
                  <BlogCard
                    key={b.slug}
                    title={b.title}
                    excerpt={b.excerpt}
                    date={b.date}
                    slug={b.slugAsParams}
                    className="px-3 py-2.5 -mx-3"
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col">
            {filteredAndSortedBlogs.map((b) => (
              <BlogCard
                key={b.slug}
                title={b.title}
                excerpt={b.excerpt}
                date={b.date}
                slug={b.slugAsParams}
                className="px-3 py-2.5 -mx-3"
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
