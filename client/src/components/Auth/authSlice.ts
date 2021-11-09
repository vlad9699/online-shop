// import api from './../../api/index'
import { createSlice } from '@reduxjs/toolkit'
import API from '../../http/userApi'
import { setError, setSuccess } from '../snackbar/snackbarSlice'

type User = {
  email:string | undefined,
  firstName:string | undefined,
  lastName:string | undefined,
  role:string | undefined,
  createdAt:string | undefined,
  updatedAt:string | undefined,
}

type initialStateType = {
  status: boolean,
  user: User
}

const initialState: initialStateType = {
  status: false,
  user: {
    email: 'undefined',
    firstName:undefined,
    lastName:undefined,
    role:undefined,
    createdAt:undefined,
    updatedAt:undefined,
  },
}

export const authSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setUser: (state, { payload }) => ({
      ...state,
      user: payload,
      status: true
    }),
  },
})

export const {
  setUser,
} = authSlice.actions

export const checkToken = () => async (dispatch: any) => {

  const [result, error]: any = await API.checkTokenRequest()

  if (error) {
    dispatch(setError(error))
  }
  if (result) {
    dispatch(setUser(result))
  }
}

export default authSlice.reducer
