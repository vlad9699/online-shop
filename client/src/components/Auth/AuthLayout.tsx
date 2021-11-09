import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { checkToken } from './authSlice'


export function AuthLayout({ children }:any) {
  const dispatch = useAppDispatch()

  const token:any = localStorage.getItem('token')

  useEffect(() => {
    (async () => {
      await dispatch(checkToken())
      }
    )()
  }, []);

  return (
    <>
      {children}
    </>
  );
}
