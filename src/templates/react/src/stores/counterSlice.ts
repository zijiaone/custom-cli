import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from './index';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// 创建计数器的 slice
export const counterSlice = createSlice({
  initialState,
  name: 'counter',
  reducers: {
    // 通过指定的数值增加计数器
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    // 重置计数器
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementByAmount, reset } = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
