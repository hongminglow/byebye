import { Check, Minus, Plus } from "lucide-react";
import { Rating, RatingButton } from "@/components/ui/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button/Button";

// Images
import TshirtFront from "@/assets/images/green-tshirt-front.png";
import TshirtBack from "@/assets/images/green-tshirt-back.png";
import TshirtModel from "@/assets/images/green-tshirt-model.png";
import { ProductProvider, useProductContext } from "./ProductContext";
import { COLOR_STYLES, TColorType, TSizeType } from "@/types/product";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";
import { publicRoutes } from "@/types/routes";

const SAMPLE_DATA = {
  id: 0,
  name: "One Life Graphic T-shirt",
  description:
    "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
  price: 300,
  discountedPrice: 260,
  gender: "F",
  image: "/assets/images/blue-short-jean.png",
  rating: 4.5,
  type: "tshirt",
};

export const ProductOverview = () => {
  return (
    <ProductProvider>
      <div className="flex space-x-10 items-center justify-between mb-20">
        <ProductImages />
        <ProductInformation />
      </div>
    </ProductProvider>
  );
};

const ProductImages = () => {
  const { state, dispatch } = useProductContext();

  const SAMPLE_IMAGES = [TshirtFront, TshirtBack, TshirtModel];

  const handleSelectImage = (index: number) => {
    dispatch({ type: "SELECT_IMAGE", payload: index });
  };

  return (
    <div className="grid grid-cols-[auto_1fr] gap-3.5 place-items-center">
      <div className="flex flex-col space-y-3.5 items-center justify-between *:h-42 *:w-38">
        <img
          src={TshirtFront}
          alt="t-shirt-front"
          className="cursor-pointer hover:opacity-90"
          onClick={() => {
            handleSelectImage(0);
          }}
        />
        <img
          src={TshirtBack}
          alt="t-shirt-back"
          className="cursor-pointer hover:opacity-90"
          onClick={() => {
            handleSelectImage(1);
          }}
        />
        <img
          src={TshirtModel}
          alt="t-shirt-model"
          className="cursor-pointer hover:opacity-90"
          onClick={() => {
            handleSelectImage(2);
          }}
        />
      </div>

      <img
        src={SAMPLE_IMAGES[state.img]}
        alt="selected-preview-image"
        className="w-111 h-132.5"
      />
    </div>
  );
};

const ProductInformation = () => {
  return (
    <div className="flex flex-col items-start justify-center divide-y divide-black/10">
      <ProductDescription />
      <ColorPicker />
      <SizePicker />
      <AddToCart />
    </div>
  );
};

const ProductDescription = () => {
  const data = SAMPLE_DATA;
  return (
    <div className="pb-6">
      <h1 className="font-integral-cf font-bold text-[2.5rem] text-black">
        One Life Graphic T-shirt
      </h1>

      <div className="flex items-center space-x-0.5 mt-3.5">
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

      <div className="flex items-center mt-3.5 space-x-2.5">
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

      <span className="text-black/60 mt-5">{data.description}</span>
    </div>
  );
};

const ColorPicker = () => {
  const { state, dispatch } = useProductContext();

  const handleSelectColor = (color: TColorType) => {
    dispatch({ type: "SELECT_COLOR", payload: color });
  };

  const SAMPLE_COLORS: TColorType[] = [
    "red",
    "green",
    "blue",
    "black",
    "white",
  ];

  return (
    <div className="flex flex-col items-start w-full justify-center space-y-4 py-6">
      <span className="text-black/60">Select Colors</span>
      <div className="flex items-center justify-start space-x-4">
        {SAMPLE_COLORS.map((color) => (
          <div
            key={color}
            className={`relative rounded-full size-9 cursor-pointer hover:scale-110 transition-transform ${COLOR_STYLES[color]}`}
            onClick={() => handleSelectColor(color)}
          >
            {state.color === color && (
              <Check
                className={`size-4 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ${
                  color === "white" ? "text-black" : "text-white"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SizePicker = () => {
  const { state, dispatch } = useProductContext();

  const handleSelectSize = (size: TSizeType) => {
    dispatch({ type: "SELECT_SIZE", payload: size });
  };

  return (
    <div className="flex flex-col items-stretch w-full justify-center space-y-4 py-6">
      <span className="text-black/60">Choose Size</span>
      <div className="flex items-center justify-start space-x-4 *:relative  *:rounded-full *:size-9">
        {["small", "medium", "large", "x-large"].map((size) => (
          <Button
            variant="ghost"
            className={cn(
              "rounded-3xl bg-gray-100 py-3 px-6 text-black/60 !w-fit",
              {
                "bg-black text-white": state.size === size,
              }
            )}
            onClick={() => handleSelectSize(size as TSizeType)}
          >
            {size.charAt(0).toUpperCase() + size.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
};

const AddToCart = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useProductContext();

  const addToCart = () => {
    console.log("shopping state.." + JSON.stringify(state, null, 2));
    navigate(publicRoutes.CHECKOUT);
  };

  return (
    <div className="flex items-center w-full gap-x-5 pt-6">
      <div className=" py-2 px-5 flex items-center space-x-9 justify-between rounded-3xl bg-gray-100 ">
        <Minus
          className="size-6 text-black/80 cursor-pointer hover:opacity-70"
          onClick={() => {
            dispatch({ type: "DECREMENT" });
          }}
        />
        <span>{state.quantity}</span>
        <Plus
          className="size-6 text-black/80 cursor-pointer hover:opacity-70"
          onClick={() => {
            dispatch({ type: "INCREMENT" });
          }}
        />
      </div>

      <Button className="rounded-3xl grow bg-black py-5 " onClick={addToCart}>
        Add to Cart
      </Button>
    </div>
  );
};
