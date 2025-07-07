import CasualProducts from "@/assets/images/casual.png";
import FormalProducts from "@/assets/images/formal.png";

import GymProducts from "@/assets/images/gym.png";
import PartyProducts from "@/assets/images/party.png";

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
  return (
    <div className="bg-gray-100 rounded-4xl px-16 py-18 flex flex-col items-center justify-center mx-25">
      <h1 className="font-bold uppercase font-integral-cf text-5xl text-black">
        Browser By Dress Style
      </h1>

      <div className="grid grid-cols-10 mt-16 w-full grid-rows-2 gap-5 *:bg-white *:rounded-2xl">
        <div className="col-span-4">
          <FilterItem image={CasualProducts} title="Casual" />
        </div>
        <div className="col-span-6">
          <FilterItem image={FormalProducts} title="Formal" />
        </div>

        <div className="col-span-6">
          <FilterItem image={PartyProducts} title="Party" />
        </div>

        <div className="col-span-4">
          <FilterItem image={GymProducts} title="Gym" />
        </div>
      </div>
    </div>
  );
};
