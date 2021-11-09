import { combineReducers, configureStore } from '@reduxjs/toolkit'
import registerReducer from '../components/authentication/register/registerSlice'
import snackbarReducer from '../components/snackbar/snackbarSlice'
import loginReducer from '../components/authentication/login/loginSlice'
import authReducer from '../components/Auth/authSlice'
// import toolkitSlice from './toolkitSlice'

const rootReducer = combineReducers({
  register: registerReducer,
  snackbar: snackbarReducer,
  login: loginReducer,
  auth: authReducer
  // toolkit: toolkitSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
