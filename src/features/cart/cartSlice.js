import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addtoCart, deleteItemFromCart, fecthItemsByUserId, resetCart, updateCart } from './cartAPI';

const initialState = {
  status:'idle',
  items: [],
  cartLoaded: false,
}
// store cart data
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({item, alert}) => {
    const response = await addtoCart(item);
    alert.success("Item Added to your cart successfully")
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
)
// fetch cart data
export const fecthItemsByUserIdAsync = createAsyncThunk(
  'cart/fecthItemsByUserId',
  async () => {
    const response = await fecthItemsByUserId()
    return response.data;
  }
)
// update item
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update)
    return response.data;
  }
)
// delete item
export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId)
    return response.data;
  }
)
// reset cart
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart()
    return response.data;
  }
)
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload)
      })
      .addCase(fecthItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fecthItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload
        state.cartLoaded = true
      })
      .addCase(fecthItemsByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoaded = true
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items[index] = action.payload
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items.splice(index,1)
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []
      })
  },
})

export const { increment } = cartSlice.actions
export const selectedItem = (state) => state.cart.items
export const selectCartStatus = (state) => state.cart.status
export const selectCartLoaded = (state) => state.cart.cartLoaded
export default cartSlice.reducer;
