import {
  Action,
  combineReducers,
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import messageReducer from '../../../shared/redux/message';
import authReducer from '../../auth/redux';
import participantsReducer from '../../participants/redux';

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  participants: participantsReducer,
});
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: () => customizedMiddleware,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppDispatch = (): ThunkDispatch<any, any, any> =>
  useDispatch<AppDispatch>();
export default store;
