import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { RatingAndReview } from "@/components/common/RatingAndReview";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    verified: true,
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 5,
    review:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.",
    verified: true,
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    review:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    verified: true,
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

const SliderControls = ({
  emblaApi,
  handleSelectItem,
}: {
  emblaApi: UseEmblaCarouselType[1];
  handleSelectItem: (index: number) => void;
}) => {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    handleSelectItem(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="flex justify-between items-center mx-25">
      <h1 className="font-bold text-black font-integral-cf text-5xl">
        OUR HAPPY CUSTOMERS
      </h1>

      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="hover:bg-gray-100 disabled:opacity-50"
        >
          <ArrowLeft className="size-6" />
        </Button>

        <Button
          variant="ghost"
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="hover:bg-gray-100 disabled:opacity-50"
        >
          <ArrowRight className="size-6" />
        </Button>
      </div>
    </div>
  );
};

const FeedbackList = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });

  const handleSelectItem = useCallback(
    (index: number) => {
      if (emblaApi) {
        setSelectedIndex(index);
      }
    },
    [emblaApi]
  );

  const getSlideClass = (index: number) => {
    const totalSlides = testimonials.length;

    // Handle looping - get adjacent slides
    const prevIndex = selectedIndex === 0 ? totalSlides - 1 : selectedIndex - 1;
    const nextIndex = selectedIndex === totalSlides - 1 ? 0 : selectedIndex + 1;

    // Center slide and immediate neighbors should be visible
    if (index === selectedIndex || index === prevIndex || index === nextIndex) {
      return "is-center";
    }

    return "is-hidden";
  };

  return (
    <div className="relative">
      <SliderControls emblaApi={emblaApi} handleSelectItem={handleSelectItem} />

      <div className="embla mt-10" ref={emblaRef}>
        <div className="embla__container">
          {testimonials.map((testimonial, index) => (
            <RatingAndReview
              item={testimonial}
              className={`${getSlideClass(index)} embla__slide `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProductFeedback = () => {
  return (
    <div className="flex flex-col space-y-10 mt-20 pb-20 mx-auto px-4">
      <FeedbackList />
    </div>
  );
};
