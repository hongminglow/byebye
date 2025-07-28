import { Badge } from "@/components/ui/badge";
import { Rating, RatingButton } from "@/components/ui/rating";
import { TProductItem } from "@/types/product";
import { useNavigate } from "react-router";
import { publicRoutes } from "@/types/routes";
import { cn } from "@/lib/utils";

const ProductItem = ({ data }: { data: TProductItem }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start justify-center font-bold text-black">
      <img
        src={data.image}
        alt={`product-${data.name}`}
        className="cursor-pointer hover:opacity-90"
        onClick={() => {
          navigate(
            `${publicRoutes.SHOP}/${data.id}?gender=${data.gender}&type=${data.type}`
          );
        }}
      />

      <span className="mt-4">{data.name}</span>
      <div className="flex items-center justify-center space-x-0.5">
        <Rating
          value={data.rating}
          readOnly
          allowHalf
          className="text-[#FFC633]"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <RatingButton key={index} size={16} />
          ))}
        </Rating>
        <span className="text-black/60 text-sm ">{data.rating}/5</span>
      </div>

      <div className="flex items-center mt-2 justify-center space-x-2.5">
        <span>${data.price}</span>
        {data.discountedPrice < data.price && (
          <>
            <span className="line-through font-bold text-2xl text-black/40">
              ${data.discountedPrice}
            </span>

            <Badge className="bg-error-500/10 text-error-500">
              -&nbsp;
              {Math.round(
                ((data.price - data.discountedPrice) / data.price) * 100
              )}
              %
            </Badge>
          </>
        )}
      </div>
    </div>
  );
};

export const ProductLayout = ({
  list,
  className,
}: {
  list: Array<TProductItem>;
  className?: string;
}) => {
  return (
    <div className={cn("grid grid-cols-4 gap-x-5 mt-13.5", className)}>
      {list.map((product) => (
        <ProductItem key={product.id} data={product} />
      ))}
    </div>
  );
};
