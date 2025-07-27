import { useParams } from "react-router";
import { TProductCategoryType } from "@/types/category";
import { BreadCrumbs } from "./BreadCrumbs";
import { ProductCategory } from "./ProductCategory";
import { Pagination } from "./Pagination";

export const Category = () => {
  const params = useParams<{ type?: TProductCategoryType }>();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center mx-25">
      <BreadCrumbs type={params.type} />
      <ProductCategory />
      <Pagination />
    </div>
  );
};
