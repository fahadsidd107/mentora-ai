import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";
import { Bookmark, Bot, CircleAlert, History } from "lucide-react";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const [companionsResult, sessionsResult, bookmarksResult] = await Promise.allSettled([
    getUserCompanions(user.id),
    getUserSessions(user.id),
    getBookmarkedCompanions(user.id),
  ]);

  const companions = companionsResult.status === "fulfilled" ? companionsResult.value : [];
  const sessionHistory = sessionsResult.status === "fulfilled" ? sessionsResult.value : [];
  const bookmarkedCompanions = bookmarksResult.status === "fulfilled" ? bookmarksResult.value : [];
  const hasDataSetupIssue = [companionsResult, sessionsResult, bookmarksResult]
    .some((result) => result.status === "rejected");

  return (
    <main className="min-lg:w-3/4 journey-page">
      <section className="journey-profile">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={`${user.firstName ?? "Mentora"} profile`}
            width={110}
            height={110}
            className="journey-avatar"
          />
          <div className="flex flex-col gap-2">
            <p className="journey-kicker">Your learning space</p>
            <h1 className="font-bold text-3xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
        <div className="journey-stats">
          <div><History /><strong>{sessionHistory.length}</strong><span>Lessons completed</span></div>
          <div><Bot /><strong>{companions.length}</strong><span>Companions created</span></div>
          <div><Bookmark /><strong>{bookmarkedCompanions.length}</strong><span>Saved companions</span></div>
        </div>
      </section>

      {hasDataSetupIssue && (
        <aside className="journey-notice" role="status">
          <CircleAlert />
          <div>
            <strong>Some learning data is not available yet.</strong>
            <p>Apply the included Supabase learning-history migration, then refresh this page.</p>
          </div>
        </aside>
      )}

      <Accordion type="multiple" defaultValue={["bookmarks", "recent"]} className="journey-accordion">
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold">
            Bookmarked Companions {`(${bookmarkedCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              companions={bookmarkedCompanions}
              title="Bookmarked Companions"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions {`(${sessionHistory.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};
export default Profile;
