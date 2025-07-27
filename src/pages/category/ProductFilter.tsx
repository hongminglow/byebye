import { Check, SlidersVertical } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  COLOR_STYLES,
  PRODUCT_COLORS,
  PRODUCT_SIZES,
  TColorType,
  TSizeType,
} from "@/types/product";
import { Button } from "@/components/ui/button/Button";
import { cn } from "@/lib/utils";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

export const ProductFilter = () => {
  const priceValRef = useRef<() => number[]>(() => [200, 800]);
  const colorValRef = useRef<() => TColorType>(() => "green" as TColorType);
  const sizeValRef = useRef<() => TSizeType>(() => "small" as TSizeType);
  const [queryParams, setQueryParams] = useQueryStates({
    price: parseAsString.withDefault("200&800"),
    color: parseAsStringEnum([...PRODUCT_COLORS]).withDefault("green"),
    size: parseAsStringEnum([...PRODUCT_SIZES]).withDefault("small"),
  });

  const updateFilterOptions = () => {
    setQueryParams({
      price: priceValRef.current().join("&"),
      color: colorValRef.current(),
      size: sizeValRef.current(),
    });
  };

  return (
    <div className="w-74 flex flex-col rounded-lg bg-whiteshadow-md pt-5 pb-7 px-6 border border-black/10 divide-y divide-gray-300 ">
      <FilterHeader />

      <Accordion
        type="multiple"
        className="w-full flex flex-col divide-y divide-gray-300 "
      >
        <AccordionItem value="filter-price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <PriceFilter
              defaultValue={queryParams.price}
              registerGetter={(fn) => (priceValRef.current = fn)}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="filter-color">
          <AccordionTrigger>Colors</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <ColorFilter
              defaultValue={queryParams.color}
              registerGetter={(fn) => (colorValRef.current = fn)}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="filter-size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <SizeFilter
              defaultValue={queryParams.size}
              registerGetter={(fn) => (sizeValRef.current = fn)}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button
        onClick={updateFilterOptions}
        className="bg-black rounded-3xl mt-4"
      >
        Apply Filter
      </Button>
    </div>
  );
};

const FilterHeader = () => (
  <div className="flex items-center justify-between pb-5">
    <h2 className="font-integral-cf font-bold text-lg">Filters</h2>
    <SlidersVertical className="size-5 text-gray-500" />
  </div>
);

const PriceFilter = ({
  registerGetter,
  defaultValue,
}: {
  registerGetter: (getter: () => number[]) => void;
  defaultValue: string;
}) => {
  const [values, setValues] = useState<number[]>(() => {
    if (defaultValue) return defaultValue.split("&").map(Number);
    return [200, 800];
  });

  const handleValueCommit = (value: number | readonly number[]) => {
    setValues(Array.isArray(value) ? [...value] : [value, value]);
  };

  useEffect(() => {
    registerGetter(() => values);
  }, [values, registerGetter]);

  return (
    <div className="flex flex-col space-y-1 py-6">
      <Slider
        defaultValue={values}
        min={0}
        max={1000}
        onValueChange={handleValueCommit}
      />
    </div>
  );
};

const ColorFilter = ({
  registerGetter,
  defaultValue,
}: {
  registerGetter: (getter: () => TColorType) => void;
  defaultValue: TColorType;
}) => {
  const [selectedColor, setSelectedColor] = useState<TColorType>(defaultValue);
  const SAMPLE_COLORS: TColorType[] = [
    "red",
    "green",
    "blue",
    "black",
    "white",
    "orange",
    "purple",
    "yellow",
    "pink",
    "cyan",
  ];

  useEffect(() => {
    registerGetter(() => selectedColor);
  }, [selectedColor, registerGetter]);

  return (
    <div className="grid grid-cols-5 gap-4">
      {SAMPLE_COLORS.map((color) => (
        <div
          key={color}
          className={`relative rounded-full size-9 cursor-pointer hover:opacity-90 transition-transform ${COLOR_STYLES[color]}`}
          onClick={() => setSelectedColor(color)}
        >
          {selectedColor === color && (
            <Check
              className={`size-4 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${
                color === "white" ? "text-black" : "text-white"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const SizeFilter = ({
  registerGetter,
  defaultValue,
}: {
  registerGetter: (getter: () => TSizeType) => void;
  defaultValue: TSizeType;
}) => {
  const [selectedSize, setSelectedSize] = useState<TSizeType>(defaultValue);
  const handleSelectSize = (size: TSizeType) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    registerGetter(() => selectedSize);
  }, [selectedSize, registerGetter]);

  return (
    <div className="flex items-center justify-start gap-4 flex-wrap *:relative  *:rounded-full *:size-9">
      {["small", "medium", "large", "x-large"].map((size) => (
        <Button
          variant="ghost"
          className={cn(
            "rounded-3xl bg-gray-100 py-3 px-6 text-black/60 !w-fit",
            {
              "bg-black text-white": selectedSize === size,
            }
          )}
          onClick={() => handleSelectSize(size as TSizeType)}
        >
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </Button>
      ))}
    </div>
  );
};
