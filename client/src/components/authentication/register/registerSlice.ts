// import api from './../../api/index'
import { createSlice } from '@reduxjs/toolkit'
import API from '../../../http/userApi'
import { setError, setSuccess } from '../../snackbar/snackbarSlice'

const initialState = {
  loading: false,
}

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => ({
      ...state,
      loading: payload,
    }),
  },
})

export const {
  setLoading,
} = registerSlice.actions

export const register = (dataReg: any, navigate: any) => async (dispatch: any) => {
  dispatch(setLoading(true))

  const [result, error]: any = await API.registerRequest(dataReg)

  if (error) {
    setTimeout(() => {
      dispatch(setLoading(false))
    }, 3000)
    dispatch(setError(error))
  }
  if (result && result.token) {
    dispatch(setLoading(false))
    dispatch(setSuccess('You are success register'))
    localStorage.setItem('token', result.token)
    setTimeout(() => {
      window.location.href = '/shop'
      navigate('/shop', { replace: true })
    }, 3000)
  }
}

export default registerSlice.reducer
