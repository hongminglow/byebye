import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "../../components/ui/button/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const Paginations = () => (
  <div className="flex pt-7.5 justify-between items-center px-2.5 relative before:absolute before:inset-x-0 before:w-full before:h-px before:bg-gray-300 before:top-2">
    <Button className="flex hover:bg-transparent space-x-2 items-center text-black bg-white border border-black/10 rounded-xl ">
      <ArrowLeft />
      <span>Previous</span>
    </Button>

    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>

    <Button className="flex hover:bg-transparent space-x-2 items-center text-black bg-white border border-black/10 rounded-xl">
      <span>Next</span>
      <ArrowRight />
    </Button>
  </div>
);
