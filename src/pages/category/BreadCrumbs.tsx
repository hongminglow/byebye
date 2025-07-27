import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TProductCategoryType } from "@/types/category";

export const BreadCrumbs = ({ type }: { type?: TProductCategoryType }) => {
  const subPath = type ? type.charAt(0).toUpperCase() + type.slice(1) : "";

  return (
    <Breadcrumb className="mt-6 mb-9">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink>{subPath}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
