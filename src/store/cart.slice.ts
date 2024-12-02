import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storege";

export const CART_PERSISTENT_STATE = "cartData";


export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE)??{
  items: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clean: (state) => {
      state.items = []
    },
    // Удаление
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    // Уменьшаем и если <0 удаляем
    descrease: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) {
        return;
      }
      if (existed) {
        if (existed.count === 1) {
          state.items = state.items.filter((i) => i.id !== action.payload);
        } else {
          state.items.map((i) => {
            if (i.id === action.payload) {
              i.count -= 1;
            }
            return i;
          });
        }
      }
    },
    // Добавляем
    increase: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items.map((i) => {
        if (i.id === action.payload) {
          i.count += 1;
        }
        return i;
      });
    },
  },
});

export default cartSlice.reducer;
export const cartActon = cartSlice.actions;
