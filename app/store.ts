import {configureStore} from '@reduxjs/toolkit';
import orderSlice from '@/features/order/orderSlice';

export const store = configureStore({
    reducer: {
        order: orderSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;