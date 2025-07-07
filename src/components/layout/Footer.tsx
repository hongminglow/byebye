import MainLogo from "@/assets/images/main-logo.png";
import Visa from "@/assets/icons/visa.png";
import Mastercard from "@/assets/icons/mastercard.png";
import ApplePay from "@/assets/icons/apple-pay.png";

import GooglePay from "@/assets/icons/google-pay.png";
import Paypal from "@/assets/icons/paypal.png";

import { Facebook, Github, Twitter, Instagram, Mail } from "lucide-react";
import { Button } from "../ui/button/Button";
import { IconInput } from "../ui/input/IconInput";

const linkSections = [
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "/about" },
      { label: "Features", href: "/features" },
      { label: "Work", href: "/work" },
      { label: "Career", href: "/career" },
    ],
  },
  {
    title: "HELP",
    links: [
      { label: "Customer Support", href: "/support" },
      { label: "Delivery Details", href: "/delivery" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "Account", href: "/account" },
      { label: "Manage Deliveries", href: "/deliveries" },
      { label: "Orders", href: "/orders" },
      { label: "Payments", href: "/payments" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "Free eBooks", href: "/ebooks" },
      { label: "Development Tutorial", href: "/tutorial" },
      { label: "How to - Blog", href: "/blog" },
      { label: "Youtube Playlist", href: "/youtube" },
    ],
  },
];

const CompanyInfo = () => (
  <div className="flex flex-col space-y-6.25 justify-start">
    <img
      src={MainLogo}
      alt="company-logo"
      className="object-contain h-9 w-15"
    />

    <span className="text-black/60 text-sm text-pretty">
      We have clothes that suits your style and which you’re proud to wear. From
      women to men.
    </span>

    <div className="flex items-center  gap-x-3 *:size-7 *:rounded-full *:border-black/20  *:flex *:items-center *:justify-center [&>*:not(:nth-child(2))]:border">
      <a href="">
        <Twitter className="h-3 w-3 stroke-black" />
      </a>
      <a href="">
        <Facebook className=" stroke-white bg-black rounded-full p-1.25" />
      </a>
      <a href="">
        <Instagram className=" stroke-black  p-1.25" />
      </a>
      <a href="">
        <Github className=" stroke-black p-1.25" />
      </a>
    </div>
  </div>
);

const FooterLinks = () => (
  <>
    {linkSections.map((section) => (
      <section key={section.title} className="flex flex-col space-y-6">
        <h2 className="text-black font-medium leading-[18px] tracking-widest">
          {section.title}
        </h2>
        <ul className="flex flex-col space-y-4">
          {section.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-black/60 hover:text-black transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </>
);

export const Footer = () => (
  <footer className="relative mt-22.5">
    <div className="bg-gray-200 relative flex flex-col px-25 pt-35 pb-22 divide-y divide-y-black/10  items-center justify-center">
      <div className="grid grid-cols-5 gap-x-28 pb-12.5">
        <CompanyInfo />
        <FooterLinks />
      </div>

      <div className="grid grid-cols-[1fr_auto] w-full pt-6.25 items-center">
        <span className="text-sm text-black/60">
          Shop.co © 2000-2023, All Rights Reserved
        </span>

        <div className="flex items-center justify-between gap-x-3 *:border-[0.5px] *:border-[#D6DCE5] *:bg-white *:px-[7px] *:py-2.5 *:rounded-md">
          <img src={Visa} alt="visa-logo" />
          <img src={Mastercard} alt="mastercard-logo" />
          <img src={Paypal} alt="paypal-logo" />
          <img src={ApplePay} alt="applepay-logo" />
          <img src={GooglePay} alt="googlepay-logo" />
        </div>
      </div>
    </div>

    <div className="absolute mx-25 -top-20 inset-x-0 bg-black rounded-2xl px-16 py-10.5 flex justify-between items-center">
      <span className="text-white text-[2.5rem]/[45px] font-bold max-w-137.5 text-wrap">
        STAY UPTO DATE ABOUT OUR LATEST OFFERS
      </span>

      <div className="flex flex-col space-y-3.5 items-center justify-center">
        <IconInput
          startIcon={<Mail className="size-4" />}
          className="rounded-3xl bg-white"
          inputClassName="max-w-none border-0 focus-visible:ring-0"
          placeholder="Enter your email address"
        />
        <Button
          variant="ghost"
          className="rounded-3xl  bg-white text-black font-medium py-3 px-22"
        >
          Subscribe to Newsletter
        </Button>
      </div>
    </div>
  </footer>
);
