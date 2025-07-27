import { ProductFilter } from "./ProductFilter";

export const ProductCategory = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-5 items-center">
      <ProductFilter />

      <div className="flex flex-col space-y-4 justify-center ">
        <p>Main Filter</p>
      </div>
    </div>
  );
};
