interface BlogHeaderProps {
  title: string;
  date: string;
  author?: string;
  category?: string;
  tags?: string[];
}

export function BlogHeader({ title, date, author, category, tags }: BlogHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mt-6 mb-8">
      <h1 className="text-xl md:text-2xl font-bold font-heading tracking-tight">
        {title}
      </h1>
      <time dateTime={date} className="text-sm text-muted-foreground">{formattedDate}</time>
    </header>
  );
}

