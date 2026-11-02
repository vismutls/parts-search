import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAnalogues, fetchGoods } from './api';

export const searchBrands = createAsyncThunk('search/brands', number => fetchGoods(number));

export const searchOffers = createAsyncThunk('search/offers', ({ number, brand }) =>
    fetchAnalogues(number, brand),
);

const initial = { status: 'idle', error: null, items: [] };

const slice = createSlice({
    name: 'search',
    initialState: {
        number: '',
        brand: null,
        brands: { ...initial },
        offers: { ...initial },
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(searchBrands.pending, (state, action) => {
            state.number = action.meta.arg;
            state.brand = null;
            state.brands = { status: 'loading', error: null, items: [], requestId: action.meta.requestId };
            state.offers = { ...initial };
        })
            .addCase(searchBrands.fulfilled, (state, action) => {
                if (state.brands.requestId !== action.meta.requestId) return;
                state.brands = { status: 'done', error: null, items: action.payload };
            })
            .addCase(searchBrands.rejected, (state, action) => {
                if (state.brands.requestId !== action.meta.requestId) return;
                state.brands = { status: 'error', error: action.error.message, items: [] };
            })
            .addCase(searchOffers.pending, (state, action) => {
                state.brand = action.meta.arg.brand;
                state.offers = { status: 'loading', error: null, items: [], requestId: action.meta.requestId };
            })
            .addCase(searchOffers.fulfilled, (state, action) => {
                if (state.offers.requestId !== action.meta.requestId) return;
                state.offers = { status: 'done', error: null, items: action.payload };
            })
            .addCase(searchOffers.rejected, (state, action) => {
                if (state.offers.requestId !== action.meta.requestId) return;
                state.offers = { status: 'error', error: action.error.message, items: [] };
            });
    },
});

export const store = configureStore({ reducer: slice.reducer });
