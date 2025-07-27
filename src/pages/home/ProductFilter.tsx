import CasualProducts from "@/assets/images/casual.png";
import FormalProducts from "@/assets/images/formal.png";

import GymProducts from "@/assets/images/gym.png";
import PartyProducts from "@/assets/images/party.png";
import { TProductCategoryType } from "@/types/category";
import { useNavigate } from "react-router";

const FilterItem = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="relative h-full">
      <img
        src={image}
        alt={title}
        className="object-cover cursor-pointer hover:opacity-80 w-full h-full max-w-full rounded-2xl"
      />
      <span className="absolute font-bold text-black text-4xl left-1/10 -translate-x-1/10 top-1/10 -translate-y-1/10">
        {title}
      </span>
    </div>
  );
};

export const ProductFilter = () => {
  const navigate = useNavigate();
  const handleNavigateCategory = (category: TProductCategoryType) => {
    if (!category) return;
    navigate(`/category/${category}`);
  };

  return (
    <div className="bg-gray-100 rounded-4xl px-16 py-18 flex flex-col items-center justify-center mx-25">
      <h1 className="font-bold uppercase font-integral-cf text-5xl text-black">
        Browser By Dress Style
      </h1>

      <div className="grid grid-cols-10 mt-16 w-full grid-rows-2 gap-5 *:bg-white *:rounded-2xl">
        <button
          className="col-span-4"
          onClick={() => {
            handleNavigateCategory("casual");
          }}
        >
          <FilterItem image={CasualProducts} title="Casual" />
        </button>
        <button
          className="col-span-6"
          onClick={() => {
            handleNavigateCategory("formal");
          }}
        >
          <FilterItem image={FormalProducts} title="Formal" />
        </button>

        <button
          className="col-span-6"
          onClick={() => {
            handleNavigateCategory("party");
          }}
        >
          <FilterItem image={PartyProducts} title="Party" />
        </button>

        <button
          className="col-span-4"
          onClick={() => {
            handleNavigateCategory("gym");
          }}
        >
          <FilterItem image={GymProducts} title="Gym" />
        </button>
      </div>
    </div>
  );
};
