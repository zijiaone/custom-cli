import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counterSlice';

// 配置 Redux store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // 这里可以添加更多的reducers
  },
});

// 从 store 本身推断出 RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
