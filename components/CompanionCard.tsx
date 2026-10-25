"use client";
import { removeBookmark } from "@/lib/actions/companion.actions";
import { addBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  subject: string;
  duration: number;
  color: string;
  bookmarked?: boolean;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
  bookmarked,
}: CompanionCardProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(Boolean(bookmarked));
  const [isPending, startTransition] = useTransition();

  const handleBookmark = async () => {
    const nextValue = !isBookmarked;
    setIsBookmarked(nextValue);

    startTransition(async () => {
      try {
        if (nextValue) await addBookmark(id, pathname);
        else await removeBookmark(id, pathname);
        router.refresh();
      } catch {
        setIsBookmarked(!nextValue);
      }
    });
  };
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button
          className="companion-bookmark"
          onClick={handleBookmark}
          disabled={isPending}
          aria-pressed={isBookmarked}
          aria-label={isBookmarked ? `Remove ${name} from bookmarks` : `Bookmark ${name}`}
        >
          <Image
            src={
              isBookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"
            }
            alt="bookmark"
            width={12.5}
            height={15}
          />
        </button>
      </div>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-bold tracking-[-0.025em]">{name}</h2>
        <p className="text-sm text-foreground/75">{topic}</p>
      </div>
      <div className="flex items-center gap-2">
        <Image
          src="/icons/clock.svg"
          alt="duration"
          width={13.5}
          height={13.5}
        />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={`/companions/${id}`} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
