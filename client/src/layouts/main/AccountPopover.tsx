import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import homeFill from '@iconify/icons-eva/home-fill'
import personFill from '@iconify/icons-eva/person-fill'
import settings2Fill from '@iconify/icons-eva/settings-2-fill'
import shoppingCartFill from '@iconify/icons-eva/shopping-cart-fill'
import logInFill from '@iconify/icons-eva/log-in-fill'
import externalLinkFill from '@iconify/icons-eva/external-link-fill'

import { Link as RouterLink } from 'react-router-dom'
// material
import { alpha } from '@mui/material/styles'
import { Avatar, Box, Button, Divider, IconButton, MenuItem, Typography } from '@mui/material'
// components
import MenuPopover from '../../components/MenuPopover'
import { useAppSelector } from '../../hooks/redux'
import { selectStatus, selectUser } from '../../components/Auth/selectors'
//
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/',
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '#',
  },
  {
    label: 'Basket',
    icon: shoppingCartFill,
    linkTo: '/shop/basket',
  },
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: '#',
  },
]

const MENU_UNREG = [
  {
    label: 'LogIn',
    icon: logInFill,
    linkTo: '/login',
  },
  {
    label: 'Register',
    icon: externalLinkFill,
    linkTo: '/register',
  },
]

const account = {
  displayName: 'Jaydon Frankie',
  email: 'test@gmail.com',
  photoURL: '/assets/mock-images/avatars/avatar_default.jpg',
}
const startAvatar = '/assets/icons/loginAnon.png'
// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false)

  const user = useAppSelector(selectUser)
  const status = useAppSelector(selectStatus)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const logOut = () => {
    window.location.href = '/'
    localStorage.clear()
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: '\'\'',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        {!status
          ?
          <Avatar src={startAvatar} alt="photoURL"/>
          :
          <Avatar src={account.photoURL} alt="photoURL"/>
        }
      </IconButton>

      {!status
        ?
        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current}
          sx={{ width: 220 }}
        >
          {/*<Box sx={{ my: 1.5, px: 2.5 }}>*/}
          {/*  <Typography variant="subtitle1" noWrap>*/}
          {/*    {account.displayName}*/}
          {/*  </Typography>*/}
          {/*  <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>*/}
          {/*    {account.email}*/}
          {/*  </Typography>*/}
          {/*</Box>*/}

          {MENU_UNREG.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
          ))}
        </MenuPopover>
        :
        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current}
          sx={{ width: 220 }}
        >
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle1" noWrap>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {user.email}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }}/>

          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
          ))}

          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button fullWidth color="inherit" variant="outlined" onClick={logOut}>
              Logout
            </Button>
          </Box>
        </MenuPopover>
      }

    </>
  )
}
