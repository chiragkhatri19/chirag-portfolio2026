import { memo } from "react";
import { Tweet } from "react-tweet";
import { cn } from "@/lib/utils";

/**
 * A styled Tweet wrapper from Magic UI.
 * This is a Client Component.
 */
const TweetCard = memo(({ id, className }: { id: string; className?: string }) => {
  return (
    <div className={cn(
      "not-prose flex w-full flex-col gap-2 rounded-2xl border border-white/5 bg-white/[0.01] p-4 text-white hover:border-white/10 transition-all",
      className
    )}>
      <div className="flex w-full overflow-hidden [&>div]:w-full">
        {/* Magic UI's TweetCard usually sets a dark theme for react-tweet */}
        <div className="tweet-container w-full" data-theme="dark">
            <Tweet id={id} />
        </div>
      </div>
      
      {/* Add custom CSS to style the nested tweet elements directly into the card context if needed */}
      <style>{`
        .tweet-container .react-tweet-theme {
          --tweet-bg-color: transparent !important;
          --tweet-border: none !important;
          --tweet-font-family: inherit !important;
          --tweet-font-color: currentcolor !important;
          --tweet-font-color-secondary: #71717a !important;
          --tweet-border-radius: 0 !important;
        }
        .react-tweet-theme {
          margin: 0 !important;
        }
      `}</style>
    </div>
  );
});

TweetCard.displayName = "TweetCard";
export default TweetCard;
