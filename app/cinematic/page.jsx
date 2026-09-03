import ExperienceCinematic from "@/components/cinematic/ExperienceCinematic";
import { SITE } from "@/lib/seo";

export const metadata = {
 title: `${SITE.PAGES.home.title}`,
 description: SITE.PAGES.home.description,
};

export default function CinematicPage() {
 return (
 <>
 <ExperienceCinematic />
 </>
 );
}
