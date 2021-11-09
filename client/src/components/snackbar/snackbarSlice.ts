import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type SnackbarState = {
  open: boolean,
  message: string,
  type: 'error' | 'warning' | 'info' | 'success'
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  type: 'error',
}

export const snackbarSlice = createSlice({
  name: 'customSnackbar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.open = true
      state.message = action.payload
      state.type = 'error'
    },
    setWarning: (state, action: PayloadAction<string>) => {
      state.open = true
      state.message = action.payload
      state.type = 'warning'
    },
    setInfo: (state, action: PayloadAction<string>) => {
      state.open = true
      state.message = action.payload
      state.type = 'info'
    },
    setSuccess: (state, action: PayloadAction<string>) => {
      state.open = true
      state.message = action.payload
      state.type = 'success'
    },
    clearErrorSlice: () => {
      return initialState
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
})

export const { setError, setWarning, setInfo, setSuccess, clearErrorSlice } = snackbarSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default snackbarSlice.reducer
