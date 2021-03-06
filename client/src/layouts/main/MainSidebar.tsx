import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
// material
import { styled } from '@mui/material/styles'
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material'
// components
import Logo from '../../components/Logo'
import Scrollbar from '../../components/Scrollbar'
import NavSection from '../../components/NavSection'
import MHidden from './MHidden'
//
import sidebarConfig from './SidebarConfig'
import { useAppSelector } from '../../hooks/redux'
import { selectStatus, selectUser } from '../../components/Auth/selectors'
import axios from 'axios'

// ----------------------------------------------------------------------

const account = {
  displayName: 'Jaydon Frankie',
  email: 'test@gmail.com',
  photoURL: '/assets/mock-images/avatars/avatar_default.jpg',
}

const DRAWER_WIDTH = 280

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}))

const AccountStyle = styled('div')(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200],
}))

// ----------------------------------------------------------------------

// MainSidebar.propTypes = {
//   isOpenSidebar: PropTypes.bool,
//   onCloseSidebar: PropTypes.func,
// }

export default function MainSidebar({ isOpenSidebar, onCloseSidebar }: any) {
  const { pathname } = useLocation()

  const user = useAppSelector(selectUser)
  const status = useAppSelector(selectStatus)

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
  const reqLogout = async () => {
    const res = await axios.get('http://localhost:8000/auth/logout', {withCredentials: true})
  }

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo/>
        </Box>
      </Box>

      <Box sx={{ mb: 5, px: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          {!status
            ?
            <AccountStyle>
              <Box sx={{ ml: 2 }} maxWidth="170px">
                <Typography textAlign="center" variant="subtitle1" sx={{ color: 'text.green' }}>
                  Welcome to our first SHOP
                </Typography>
              </Box>
            </AccountStyle>
            :
            <AccountStyle>
              <Avatar src={account.photoURL} alt="photoURL"/>
              <Box sx={{ ml: 2 }} maxWidth="170px">
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2"  sx={{ color: 'text.secondary'}} noWrap>
                  {user.email}
                </Typography>
              </Box>
            </AccountStyle>
          }

        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig}/>

      <Box sx={{ flexGrow: 1 }}/>

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack
          alignItems="center"
          spacing={3}
          sx={{
            p: 2.5,
            pt: 5,
            borderRadius: 2,
            position: 'relative',
            bgcolor: 'grey.200',
          }}
        >
          <Box
            component="img"
            src="/assets/illustrations/illustration_avatar.png"
            sx={{ width: 100, position: 'absolute', top: -50 }}
          />

          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6">
              Registration
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Only 5 minutes
            </Typography>
          </Box>
          <Box sx ={{display: 'flex', gap: '10px'}}>
            <Button
              // href="/shop"
              fullWidth
              // target="_blank"
              variant="contained"
              onClick={reqLogout}

            >
              LogIn
            </Button>
            <Button
              component={RouterLink}
              to="/register"
              fullWidth
              variant="contained"
            >
              Register
            </Button>
          </Box>

        </Stack>
      </Box>
    </Scrollbar>
  )

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
            },
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  )
}
