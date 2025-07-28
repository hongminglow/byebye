import { ProductLayout } from "@/components/ui/layout/ProductLayout";
import { TProductItem } from "@/types/product";
import { ProductFilter } from "./ProductFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Paginations } from "./Pagination";

const SAMPLE_PRODUCTS: Array<TProductItem> = [
  {
    id: 0,
    name: "T-SHIRT WITH TAPE DETAILS",
    description: "This is a stylish t-shirt with unique tape details.",
    price: 29.99,
    discountedPrice: 19.99,
    image: "/assets/images/black-tshirt.png",
    rating: 4.5,
    type: "tshirt",
    gender: "M",
  },
  {
    id: 1,
    name: "SKINNY FIT JEANS",
    description: "These jeans are designed for a perfect fit and comfort.",
    price: 240,
    discountedPrice: 220,

    image: "/assets/images/blue-jean.png",
    rating: 3.5,
    type: "jeans",
    gender: "M",
  },

  {
    id: 2,
    name: "CHECKERED SHIRT",
    description: "A classic checkered shirt that never goes out of style.",
    price: 36.5,
    discountedPrice: 36.5,

    image: "/assets/images/red-tshirt.png",
    rating: 4.5,
    type: "tshirt",
    gender: "M",
  },
  {
    id: 3,
    name: "SLEEVE STRIPED T-SHIRT",
    description: "A trendy t-shirt with stylish sleeve stripes.",
    price: 130,
    discountedPrice: 100,
    image: "/assets/images/orange-tshirt.png",
    rating: 5,
    type: "tshirt",
    gender: "F",
  },
  {
    id: 4,
    name: "T-SHIRT WITH TAPE DETAILS",
    description: "This is a stylish t-shirt with unique tape details.",
    price: 29.99,
    discountedPrice: 19.99,
    image: "/assets/images/black-tshirt.png",
    rating: 4.5,
    type: "tshirt",
    gender: "M",
  },
  {
    id: 5,
    name: "SKINNY FIT JEANS",
    description: "These jeans are designed for a perfect fit and comfort.",
    price: 240,
    discountedPrice: 220,

    image: "/assets/images/blue-jean.png",
    rating: 3.5,
    type: "jeans",
    gender: "M",
  },

  {
    id: 6,
    name: "CHECKERED SHIRT",
    description: "A classic checkered shirt that never goes out of style.",
    price: 36.5,
    discountedPrice: 36.5,

    image: "/assets/images/red-tshirt.png",
    rating: 4.5,
    type: "tshirt",
    gender: "M",
  },
  {
    id: 7,
    name: "SLEEVE STRIPED T-SHIRT",
    description: "A trendy t-shirt with stylish sleeve stripes.",
    price: 130,
    discountedPrice: 100,
    image: "/assets/images/orange-tshirt.png",
    rating: 5,
    type: "tshirt",
    gender: "F",
  },
  {
    id: 8,
    name: "SAMPLES CLOTHES",
    description: "These jeans are designed for a perfect fit and comfort.",
    price: 240,
    discountedPrice: 220,

    image: "/assets/images/blue-jean.png",
    rating: 3.5,
    type: "jeans",
    gender: "M",
  },
];

export const ProductCategory = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-5 items-start">
      <ProductFilter />

      <div className="grid grid-rows-[auto_1fr_auto] gap-4 ">
        <div className="flex items-center justify-between">
          <h2 className="font-integral-cf text-lg font-bold">Casual</h2>

          <div className="flex space-x-3 ml-auto items-center">
            <span className="text-gray-500">Showing 1-10 of 100 Products</span>

            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-500">Sort By:</span>

              <Select>
                <SelectTrigger className="w-fit bg-transparent focus-visible:ring-0 shadow-none border-none data-[placeholder]:text-black">
                  <SelectValue placeholder="Most Popular" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="new">New Arrival</SelectItem>
                  <SelectItem value="top-seller">Best Seller</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <ProductLayout
          list={SAMPLE_PRODUCTS}
          className="grid-cols-3 mt-2 gap-y-8"
        />

        <Paginations />
      </div>
    </div>
  );
};
