import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { discountAPI } from '../../utils/api'

// Async thunk для отправки заявки на скидку
export const sendDiscountRequest = createAsyncThunk(
  'discount/sendRequest',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await discountAPI.sendDiscountRequest(formData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send discount request')
    }
  }
)

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    loading: false,
    error: null,
    success: false,
    submittedEmails: [] // Храним email'ы для которых уже отправлены заявки
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearSuccess: (state) => {
      state.success = false
    },
    resetForm: (state) => {
      state.loading = false
      state.error = null
      state.success = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendDiscountRequest.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(sendDiscountRequest.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.error = null
        // Добавляем email в список отправленных заявок
        if (action.meta.arg.email) {
          state.submittedEmails.push(action.meta.arg.email)
        }
      })
      .addCase(sendDiscountRequest.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.success = false
      })
  }
})

export const { clearError, clearSuccess, resetForm } = discountSlice.actions

// Селекторы
export const selectDiscountLoading = (state) => state.discount.loading
export const selectDiscountError = (state) => state.discount.error
export const selectDiscountSuccess = (state) => state.discount.success
export const selectSubmittedEmails = (state) => state.discount.submittedEmails

export default discountSlice.reducer
