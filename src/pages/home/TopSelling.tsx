import { ProductLayout } from "@/components/ui/layout/ProductLayout";
import { TProductItem } from "@/types/product";
import { Button } from "@/components/ui/button/Button";

const SAMPLE_PRODUCTS: Array<TProductItem> = [
  {
    id: 0,
    name: "VERTICAL STRIPED SHIRT",
    description: "This is a stylish t-shirt with unique tape details.",
    price: 210,
    discountedPrice: 232,
    image: "/assets/images/green-tshirt.png",
    rating: 4.5,
    type: "tshirt",
    gender: "M",
  },
  {
    id: 1,
    name: "COURAGE GRAPHIC T-SHIRT",
    description: "These jeans are designed for a perfect fit and comfort.",
    price: 145,
    discountedPrice: 145,
    image: "/assets/images/orange-fancy-tshirt.png",
    rating: 3,
    type: "tshirt",
    gender: "M",
  },

  {
    id: 2,
    name: "LOOSE FIT BERMUDA SHORTS",
    description: "A classic checkered shirt that never goes out of style.",
    price: 80,
    discountedPrice: 80,
    gender: "F",
    image: "/assets/images/blue-short-jean.png",
    rating: 5,
    type: "jeans",
  },
  {
    id: 3,
    name: "FADED SKINNY JEANS",
    description: "A trendy t-shirt with stylish sleeve stripes.",
    price: 210,
    discountedPrice: 210,
    image: "/assets/images/black-jean.png",
    rating: 4,
    type: "jeans",
    gender: "M",
  },
];

export const TopSelling = () => (
  <div className="flex flex-col pb-20 justify-center items-center pt-18 ">
    <h1 className="text-black uppercase font-bold font-integral-cf text-5xl">
      Top Selling
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
