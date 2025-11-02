import { useParams } from "react-router";
import { BreadCrumbs } from "./BreadCrumbs";
import { RecommendedProducts } from "./UserPreferences";
import { ProductTabs } from "./ProductTabs";
import { ProductOverview } from "./ProductOverview";

export const Shop = () => {
  const params = useParams<{ id?: string }>();

  return (
    <div className="grid grid-rows-[auto_1fr_auto_1fr] items-center mx-25">
      <BreadCrumbs />
      <ProductOverview />
      <ProductTabs />
      <RecommendedProducts />
    </div>
  );
};
