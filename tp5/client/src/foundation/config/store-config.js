import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/root-reducer';

export const createStore = () =>
  configureStore({
    reducer: rootReducer,
  });
