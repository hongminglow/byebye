import { TColorType, TSizeType } from "./product";

export type TProductInitialState = {
  img: number;
  color: TColorType;
  size: TSizeType;
  quantity: number;
};
export type TProductAction =
  | { type: "SELECT_IMAGE"; payload: number }
  | { type: "SELECT_COLOR"; payload: string }
  | { type: "SELECT_SIZE"; payload: string }
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" };
