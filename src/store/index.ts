import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { formSlice } from '../components/container/ducks/formSlice';

const reducer = {
  form: formSlice.reducer,
};

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
