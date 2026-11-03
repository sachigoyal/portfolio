import { LinkPreview } from "@/components/ui/link-preview";
import { Socials } from "./socials";
import { BookACall } from "./book-a-call";

export function Intro() {
  return (
    <div className="mt-6">
      <div className="flex items-center flex-wrap justify-between gap-2">
        <h1 className="font-semibold text-xl md:text-2xl tracking-tight">
          Hi <span className="wave">👋</span> I'm Sachi
        </h1>
        <div className="flex items-center">
          <Socials />
          <BookACall />
        </div>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Software engineer at{" "}
        <LinkPreview href="https://www.meetjamie.ai/" image="/previews/jamie.jpg">
          Jamie
        </LinkPreview>
      </p>
    </div>
  );
}
