export const PRODUCT_TYPE = [
  {
    label: "T-Shirt",
    value: "tshirt",
  },
  {
    label: "Jeans",
    value: "jeans",
  },
  {
    label: "Pajamas",
    value: "pajamas",
  },
] as const;

export const PRODUCT_GENDER = [
  {
    label: "Men",
    value: "M",
  },
  {
    label: "Women",
    value: "F",
  },
] as const;

export type TProductItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: string;
  rating: number;
  type: (typeof PRODUCT_TYPE)[number]["value"];
  gender: (typeof PRODUCT_GENDER)[number]["value"];
};

export const COLOR_STYLES: Record<TColorType, string> = {
  red: "bg-red-900",
  green: "bg-green-900",
  blue: "bg-blue-900",
  black: "bg-black",
  white: "bg-white border-2 border-gray-300",
  orange: "bg-[#F57906] border-2 border-gray-300",
  purple: "bg-[#7D06F5]",
  yellow: "bg-[#F5DD06]",
  pink: "bg-[#F506A4]",
  cyan: "bg-[#06CAF5]",
};

export const PRODUCT_COLORS = [
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
] as const;

export type TColorType = (typeof PRODUCT_COLORS)[number];

export const PRODUCT_SIZES = ["small", "medium", "large", "x-large"] as const;
export type TSizeType = (typeof PRODUCT_SIZES)[number];
