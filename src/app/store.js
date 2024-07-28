import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import logger from "redux-logger";
import { counterSlice } from "../features/counter/counterSlice";
import { pokemonApiSlice } from "../features/pokemon/pokemonApiSlice";

const rootReducer = combineSlices(counterSlice, pokemonApiSlice);

export const makeStore = (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    preloadedState,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
