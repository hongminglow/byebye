import { CircleCheck, Ellipsis } from "lucide-react";
import { Rating, RatingButton } from "@/components/ui/rating";
import { cn } from "@/lib/utils";

type TRatingReviewItem = {
  id: number;
  name: string;
  rating: number;
  review: string;
  verified: boolean;
  date?: string;
};

export const RatingAndReview = ({
  item,
  className,
  isEllipsis = false,
}: {
  item: TRatingReviewItem;
  className?: string;
  isEllipsis?: boolean;
}) => (
  <div
    key={item.id}
    className={cn(
      "flex flex-col justify-between border border-gray-300 rounded-[20px] p-6 bg-white",
      className
    )}
  >
    <div className="flex items-center justify-between space-x-1 mb-4">
      <Rating value={item.rating} readOnly allowHalf className="text-[#FFC633]">
        {Array.from({ length: 5 }).map((_, index) => (
          <RatingButton key={index} size={16} />
        ))}
      </Rating>

      {isEllipsis && <Ellipsis className="text-black/40" />}
    </div>

    <div className="flex items-center space-x-1">
      <p className="font-semibold text-black">{item.name}</p>
      {item.verified && <CircleCheck className="fill-green-500 text-white" />}
    </div>
    <p className="text-gray-700 text-base leading-relaxed mt-3">
      "{item.review}"
    </p>

    <p className="font-medium mt-6 text-black/60 ">
      {item.date ? `Posted on ${item.date}` : "\u2002"}
    </p>
  </div>
);
