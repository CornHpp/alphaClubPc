// counterSlice.ts 文件

import { createSlice } from "@reduxjs/toolkit";

export interface searchValueState {
  value: string;
}
const initialState: searchValueState = {
  value: "",
};

// 创建一个 Slice
export const searchValueSlice = createSlice({
  name: "serachValue",
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 定义一个加的方法
    setSearchValue: (state, action) => {
      state.value = action.payload;
    },
  },
});
// 导出加减的方法
export const { setSearchValue } = searchValueSlice.actions;

// 默认导出
export default searchValueSlice.reducer;
