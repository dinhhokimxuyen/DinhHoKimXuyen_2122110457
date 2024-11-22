import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"; // import reducer từ slice đã tạo

const store = configureStore({
  reducer: {
    cart: cartReducer, // Tên state là 'cart', có thể thêm các reducers khác tại đây
  },
});

export default store;
