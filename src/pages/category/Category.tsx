import { useParams } from "react-router";
import { TProductCategoryType } from "@/types/category";
import { BreadCrumbs } from "./BreadCrumbs";
import { ProductCategory } from "./ProductCategory";

export const Category = () => {
  const params = useParams<{ type?: TProductCategoryType }>();

  return (
    <div className="grid grid-rows-[auto_1fr] items-center mx-25 mb-15">
      <BreadCrumbs type={params.type} />
      <ProductCategory />
    </div>
  );
};
