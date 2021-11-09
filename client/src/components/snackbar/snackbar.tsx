import { Alert, Snackbar } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { clearErrorSlice } from './snackbarSlice'


const CustomSnackbar: FC = () => {

  const dispatch = useAppDispatch()
  const { open, message, type } = useAppSelector(state => state.snackbar)

  const handleClose = () => dispatch(clearErrorSlice())

  useEffect(() => {
    if (!open) return
    setTimeout(() => {
      dispatch(clearErrorSlice())
    }, 5000)
  }, [open])

  return open ? (
    <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  ) : null
}

export default CustomSnackbar
