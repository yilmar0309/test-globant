import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import documents from './slices/documentsSlice';

export const store = configureStore({
  reducer: {
    documents,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
