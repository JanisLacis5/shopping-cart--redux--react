import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"

const initialState = {
    cart: [],
    amount: 0,
    total: 0,
    isLoading: true,
}

const url = "https://course-api.com/react-useReducer-cart-project"

export const getCart = createAsyncThunk("cart/getCart", () => {
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.log(err))
})

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = []
        },
        removeItem: (state, {payload}) => {
            state.cart = state.cart.filter((item) => item.id !== payload)
        },
        toggleItemAmount: (state, {payload}) => {
            const item = state.cart.find((i) => i.id === payload.id)
            if (payload.func === "inc") {
                item.amount = item.amount + 1
            }
            if (payload.func === "dec") {
                item.amount = item.amount - 1
            }
        },
        countTotals: (state) => {
            let totalPrice = 0
            let totalAmount = 0
            state.cart.forEach((item) => {
                totalAmount += item.amount
                totalPrice += item.amount * item.price
            })
            state.amount = totalAmount
            state.total = totalPrice
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCart.fulfilled, (state, {payload}) => {
                state.cart = payload
                state.isLoading = false
            })
            .addCase(getCart.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export const {clearCart, removeItem, toggleItemAmount, countTotals} =
    cartSlice.actions
export default cartSlice.reducer
