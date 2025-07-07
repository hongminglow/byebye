import { TProductAction, TProductInitialState } from "@/types/reducer";
import { TColorType, TSizeType } from "@/types/product";

export const initialState: TProductInitialState = {
  img: 0,
  color: "red",
  size: "medium",
  quantity: 0,
};

export const productReducer = (
  initialState: TProductInitialState,
  action: TProductAction
): TProductInitialState => {
  switch (action.type) {
    case "SELECT_IMAGE":
      return { ...initialState, img: action.payload };
    case "SELECT_COLOR":
      return { ...initialState, color: action.payload as TColorType };
    case "SELECT_SIZE":
      return { ...initialState, size: action.payload as TSizeType };
    case "INCREMENT":
      return { ...initialState, quantity: initialState.quantity + 1 };
    case "DECREMENT":
      return {
        ...initialState,
        quantity: initialState.quantity > 0 ? initialState.quantity - 1 : 0,
      };
    case "RESET":
      return initialState;
    default:
      return initialState;
  }
};
