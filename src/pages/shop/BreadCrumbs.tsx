import { parseAsStringEnum, useQueryStates } from "nuqs";
import { PRODUCT_GENDER, PRODUCT_TYPE } from "@/types/product";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router";

export const BreadCrumbs = () => {
  const [queryParam] = useQueryStates({
    type: parseAsStringEnum(
      [...PRODUCT_TYPE].map((item) => item.value)
    ).withDefault("tshirt"),
    gender: parseAsStringEnum([
      ...PRODUCT_GENDER.map((item) => item.value),
    ]).withDefault("M"),
  });
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean)[0];
  const subPath = pathSegments.charAt(0).toUpperCase() + pathSegments.slice(1);

  return (
    <Breadcrumb className="mt-6 mb-9">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={location.pathname}>{subPath}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem isInner>
          {
            PRODUCT_GENDER.find((item) => item.value === queryParam.gender)
              ?.label
          }
        </BreadcrumbItem>

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            {PRODUCT_TYPE.find((item) => item.value === queryParam.type)?.label}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
