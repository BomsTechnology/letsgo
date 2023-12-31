import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import myTripSearchReducer from './features/search/myTripSearchSlice';
import localizationReducer from './features/search/localizationSlice';
import settingReducer from './features/setting/settingSlice';
import userReducer from './features/user/userSlice';


export const store = configureStore({
  reducer: {
      auth: authReducer,
      myTripSearch: myTripSearchReducer,
      user: userReducer,
      localization: localizationReducer,
      setting: settingReducer,
  },
 /* middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  },*/
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
