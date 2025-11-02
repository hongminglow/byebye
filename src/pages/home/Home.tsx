import { Landing } from "./Landing";
import { NewArrivals } from "./NewArrivals";
import { ProductFilter } from "./ProductFilter";
import { TopSelling } from "./TopSelling";
import { ProductFeedback } from "./ProductFeedback";
import { useQuery } from "@tanstack/react-query";
import { getUserListQueryOption } from "@/services/query/utils";
import { useInitWebSocket } from "@/hooks/useInitWebSocket";
import { useState } from "react";

export const Home = () => {
  useInitWebSocket();
  const [image, setImage] = useState<string | null>(null);
  const { data } = useQuery(getUserListQueryOption());
  //   console.log("data.." + JSON.stringify(data, null, 2));

  //   useEffect(() => {
  //     fetch("http://localhost:3001/api/products/1/image", {
  //       method: "GET",
  //       headers: {
  //         "CONTENT-TYPE": "application/json",
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozLCJ1c2VybmFtZSI6ImFkbWluaXN0cmF0b3IiLCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsImV4cCI6MTc1MzExNTkxOCwiaWF0IjoxNzUzMDI5NTE4fQ.X1jhRZqvQzvsMPPjD32Bp7Bm5pZFTwxdIi5R6HVMCs8`,
  //       },
  //     })
  //       .then((res) => res.blob())
  //       .then((blob) => {
  //         console.log("Image data:", data);
  //         const url = URL.createObjectURL(blob);
  //         setImage(url);
  //       });
  //   }, []);

  return (
    <>
      {/* {image && <img src={image} alt="sample-image" />} */}
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
