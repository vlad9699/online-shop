import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { checkToken } from './authSlice'
import axios from 'axios'


export function AuthLayout({ children }:any) {
  const dispatch = useAppDispatch()

  const token:any = localStorage.getItem('token')

  useEffect(() => {
    (async () => {
      await dispatch(checkToken())
        const res = await axios.get('http://localhost:8000/auth/getuser',{withCredentials: true})
      }
    )()
  }, []);

  return (
    <>
      {children}
    </>
  );
}
