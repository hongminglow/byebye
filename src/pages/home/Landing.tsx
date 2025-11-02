import MainBackground from "@/assets/images/main-background.png";
import VersaceLogo from "@/assets/images/versace-logo.png";
import ZaraLogo from "@/assets/images/zara-logo.png";
import GucciLogo from "@/assets/images/gucci-logo.png";
import PradaLogo from "@/assets/images/prada-logo.png";
import CalvinLogo from "@/assets/images/calvin-logo.png";
import SmallDiamond from "@/assets/images/diamond-small.png";
import MediumDiamond from "@/assets/images/diamond-medium.png";
import { Button } from "@/components/ui/button/Button";
import Marquee from "react-fast-marquee";

const HeroSection = () => {
  return (
    <div className="relative">
      <img
        src={MainBackground}
        alt="main-background"
        className="object-cover"
      />

      <div className="absolute max-w-150 left-25 top-25 bottom-29 flex flex-col gap-y-8 items-start justify-center">
        <p className="font-extrabold font-integral-cf text-[4rem]/[4.2rem] break-words text-black">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </p>
        <p className="text-black/60 font-light leading-5.5">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>
        <Button className="bg-black rounded-3xl py-3.5 px-17 self-start">
          Shop Now
        </Button>

        <div className="flex max-w-150 items-center justify-center divide-x divide-black/10 *:flex *:flex-col *:first:pr-8 [&>*:nth-child(2)]:px-10  *:last:pl-8">
          <div>
            <span className="font-bold text-[2.5rem] text-black">200+</span>
            <span className=" text-black/60">International Brands</span>
          </div>

          <div>
            <span className="font-bold text-[2.5rem] text-black">2000+</span>
            <span className=" text-black/60 ">High-Quality Products</span>
          </div>

          <div>
            <span className="font-bold text-[2.5rem] text-black">30,000+</span>
            <span className=" text-black/60 ">Happy Customers</span>
          </div>
        </div>
      </div>

      {/* Diamond position */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 ">
        <img src={SmallDiamond} alt="diamond-small" />
      </div>

      <div className="absolute right-1/10 translate-x-[10%] top-1/5 -translate-y-1/5 ">
        <img src={MediumDiamond} alt="diamond-medium" />
      </div>
    </div>
  );
};

export const Landing = () => {
  return (
    <section className="grid grid-rows-[1fr_auto] bg-gray-200">
      <HeroSection />

      <div className="bg-black  py-11 px-25 flex items-center justify-center gap-x-26.5">
        <Marquee speed={50} gradient={false} pauseOnHover={true}>
          <img src={VersaceLogo} alt="versace-logo" className="mx-13.25" />
          <img src={ZaraLogo} alt="zara-logo" className="mx-13.25" />
          <img src={GucciLogo} alt="gucci-logo" className="mx-13.25" />
          <img src={PradaLogo} alt="prada-logo" className="mx-13.25" />
          <img src={CalvinLogo} alt="calvin-logo" className="mx-13.25" />
        </Marquee>
      </div>
    </section>
  );
};
