import { ProductLayout } from "@/components/ui/layout/ProductLayout";
import { TProductItem } from "@/types/product";
import { Button } from "@/components/ui/button/Button";

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
];

export const NewArrivals = () => (
  <div className="flex flex-col pb-20 justify-center items-center pt-18 ">
    <h1 className="text-black uppercase font-bold font-integral-cf text-5xl">
      New Arrivals
    </h1>

    <ProductLayout list={SAMPLE_PRODUCTS} />

    <Button
      variant="ghost"
      className="mt-9 px-20 py-3.5 rounded-3xl border border-black/10"
    >
      View All
    </Button>
  </div>
);
