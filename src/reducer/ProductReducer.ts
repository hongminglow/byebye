import { TProductAction, TProductInitialState } from "@/types/reducer";
import { TColorType, TSizeType } from "@/types/product";

export const initialState: TProductInitialState = {
  img: 0,
  color: "red",
  size: "medium",
  quantity: 0,
};

export const productReducer = (
  draft: TProductInitialState,
  action: TProductAction
): void => {
  switch (action.type) {
    case "SELECT_IMAGE":
      draft.img = action.payload;
      break;
    case "SELECT_COLOR":
      draft.color = action.payload as TColorType;
      break;
    case "SELECT_SIZE":
      draft.size = action.payload as TSizeType;
      break;
    case "INCREMENT":
      draft.quantity += 1;
      break;
    case "DECREMENT":
      draft.quantity = draft.quantity > 0 ? draft.quantity - 1 : 0;
      break;
    case "RESET":
      draft.img = initialState.img;
      draft.color = initialState.color;
      draft.size = initialState.size;
      draft.quantity = initialState.quantity;
      break;
    default:
      break;
  }
};
