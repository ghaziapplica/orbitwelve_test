import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import FindUsSection from "@/components/FindUsSection";
import { Hero } from "@/components/heros";
import OurServices from "@/components/OurServices";
import PurposeSection from "@/components/PurposeSection";
import { getClients, getProjects, getReviews, getTeam } from "@/lib/public-api";

export default async function Home() {
  // Fetch all data in parallel with error handling
  const [clients, reviews, projects, team] = await Promise.all([
    getClients().catch(() => []),
    getReviews().catch(() => []),
    getProjects().catch(() => []),
    getTeam().catch(() => []),
  ]);

  return (
    <>
      <Hero />
      <AboutSection />
      <PurposeSection />
      <OurServices />
      {/* <ClientsSection clients={clients} /> */}

      {/* Reviews Section */}

      {/* <LatestWorkSection projects={projects} /> */}
      {/* <TeamSection team={team} /> */}
      <FindUsSection />
      <ContactSection />
    </>
  );
}
