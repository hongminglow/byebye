import { Landing } from "./Landing";
import { NewArrivals } from "./NewArrivals";
import { ProductFilter } from "./ProductFilter";
import { TopSelling } from "./TopSelling";
import { ProductFeedback } from "./ProductFeedback";

export const Home = () => {
  return (
    <>
      <Landing />
      <NewArrivals />
      {/* Divider  */}
      <p className="h-[1px] w-4/5 bg-black/10 mx-auto" />
      <TopSelling />
      <ProductFilter />
      <ProductFeedback />
    </>
  );
};
