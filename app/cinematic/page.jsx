import ExperienceCinematic from "@/components/cinematic/ExperienceCinematic";
import { PAGES } from "@/lib/seo";

export const metadata = {
 title: `${PAGES.home.title}`,
 description: PAGES.home.description,
};

export default function CinematicPage() {
 return (
 <>
 <ExperienceCinematic />
 </>
 );
}
