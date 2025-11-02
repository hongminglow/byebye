import { Button } from "@/components/ui/button/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersVertical } from "lucide-react";
import { RatingAndReview } from "@/components/common/RatingAndReview";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    verified: true,
    date: "August 14, 2023",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    review:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.",
    verified: true,
    date: "August 14, 2023",
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    review:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    verified: true,
    date: "August 20, 2023",
  },
  {
    id: 4,
    name: "Emma R.",
    rating: 4.5,
    review:
      "The customer service at Shop.co is exceptional. They were quick to respond to my queries and helped me find exactly what I was looking for.",
    verified: true,
  },
  {
    id: 5,
    name: "Michael T.",
    rating: 5,
    review:
      "I've been shopping with Shop.co for over a year now and I'm consistently impressed with the quality of their products and fast shipping.",
    verified: true,
  },
];

export const ProductReviews = () => {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex items-center my-8 w-full">
        <p className="text-black text-2xl font-bold ">All Reviews</p>
        <span className="text-black/60">&nbsp;(451)</span>

        <div className="ml-auto flex items-center space-x-2.5">
          <Button className="rounded-full bg-gray-100 size-10 " variant="ghost">
            <SlidersVertical className="size-5 stroke-black" strokeWidth={1} />
          </Button>

          <Select>
            <SelectTrigger className="w-[120px] rounded-3xl data-[placeholder]:text-black bg-gray-100">
              <SelectValue placeholder="Latest" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="kids">Kids</SelectItem>
            </SelectContent>
          </Select>

          <Button className="rounded-3xl">Write a review</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {testimonials.map((testimonial) => (
          <RatingAndReview item={testimonial} isEllipsis />
        ))}
      </div>

      <Button
        variant="ghost"
        className="mt-9 px-11.5 py-5 rounded-3xl border border-black/10"
      >
        Load More Reviews
      </Button>
    </div>
  );
};
