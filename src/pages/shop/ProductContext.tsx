import { ReactNode, useContext, createContext } from "react";
import { initialState, productReducer } from "@/reducer/ProductReducer";
import { TProductAction, TProductInitialState } from "@/types/reducer";
import { useImmerReducer } from "use-immer";

type TProductContext = {
  state: TProductInitialState;
  dispatch: React.ActionDispatch<[action: TProductAction]>;
};

const ProductContext = createContext<TProductContext | null>(null);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("Product Context is not available");
  return ctx;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useImmerReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
