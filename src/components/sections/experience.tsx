import { ListItemCard } from "@/components/ui/list-item-card";

export function Experience() {
  return (
    <div className="text-sm">
      <p className="font-semibold text-lg">Experience</p>
      <div className="flex flex-col mt-2 -mx-2">
        {experiences.map((exp) => (
          <ListItemCard
            key={`${exp.company}-${exp.role}`}
            asChild
            className="items-center"
          >
            <a href={exp.url} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-3 min-w-0 w-full">
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="size-10 rounded-md shrink-0 bg-muted object-cover"
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-sm truncate">{exp.role}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {exp.company}
                  </span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                {exp.duration}
              </span>
            </a>
          </ListItemCard>
        ))}
      </div>
    </div>
  );
}

const experiences = [
  {
    role: "Frontend Engineer",
    company: "Origin",
    url: "https://orgn.com/",
    logo: "https://www.google.com/s2/favicons?domain=orgn.com&sz=128",
    duration: "Mar 2026 - Present",
  },
];
