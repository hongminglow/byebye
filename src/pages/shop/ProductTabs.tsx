import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProductFaq } from "./tabs/ProductFaq";
import { ProductReviews } from "./tabs/ProductReview";
import { ProductDetails } from "./tabs/ProductDetails";

export const ProductTabs = () => {
  return (
    <Tabs defaultValue="review">
      <TabsList>
        <TabsTrigger value="details">Product Details</TabsTrigger>
        <TabsTrigger value="review">Rating & Reviews</TabsTrigger>
        <TabsTrigger value="faq">FAQs</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <ProductDetails />
      </TabsContent>
      <TabsContent value="review">
        <ProductReviews />
      </TabsContent>
      <TabsContent value="faq">
        <ProductFaq />
      </TabsContent>
    </Tabs>
  );
};
