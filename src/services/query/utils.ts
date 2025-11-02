import { queryOptions } from "@tanstack/react-query";
import { getUserList } from "./user";

export const getUserListQueryOption = () => {
  return queryOptions({
    queryKey: ["user-list"],
    queryFn: () => getUserList(),
  });
};
