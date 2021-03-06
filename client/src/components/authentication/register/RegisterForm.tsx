import * as Yup from 'yup'
import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Form, FormikProvider, useFormik } from 'formik'
import eyeFill from '@iconify/icons-eva/eye-fill'
import eyeOffFill from '@iconify/icons-eva/eye-off-fill'
import { useNavigate } from 'react-router-dom'
// material
import { IconButton, InputAdornment, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { register } from './registerSlice'

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(state => state.register)
  console.log(loading)

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required').min(6, 'Too Short!').max(12, 'Too Long!'),
  })

  const sendDataReg = async (values: any) => {
    const dataReg = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    }
    await dispatch(register(dataReg, navigate))
    //   navigate('/shop', { replace: true })
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: sendDataReg,
    // onSubmit: () => {
    //   navigate('/shop', { replace: true })
    // },
  })

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill}/>
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  )
}
