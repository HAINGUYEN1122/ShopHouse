import { combineSlices, configureStore } from "@reduxjs/toolkit";
// import { counterSlice } from "./features/counter/counterSlice";
// import { quotesApiSlice } from "./features/quotes/quotesApiSlice";
// import { todoSlice } from "./features/todo/todoSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices();
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
