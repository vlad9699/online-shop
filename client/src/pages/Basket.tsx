import { Icon } from '@iconify/react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { Button, Container, IconButton, Stack, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import logInFill from '@iconify/icons-eva/log-in-fill'


// components
import Page from '../components/Page'

export default function Basket() {
  return (
    <Page title="Shop | Basket">
      <Container>
        <Stack direction="column" alignItems="center" justifyContent="space-between" mb={5}>
          <IconButton sx={{mb: 3}} aria-label="card">
            <ShoppingCartIcon fontSize="large" />
          </IconButton>
          <Typography sx={{mb: 3}} variant="h4" gutterBottom>
            Your bag is empty
          </Typography>
          <Typography  sx={{mb: 3}} variant="body1" gutterBottom>
            Sign in to see your bag
            and get shopping!
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/login"
            endIcon={<Icon icon={logInFill} />}
          >
            Sign in
          </Button>
        </Stack>

        {/*<Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">*/}
        {/*  <BlogPostsSearch posts={POSTS} />*/}
        {/*  <BlogPostsSort options={SORT_OPTIONS} />*/}
        {/*</Stack>*/}

        {/*<Grid container spacing={3}>*/}
        {/*  {POSTS.map((post, index) => (*/}
        {/*    <BlogPostCard key={post.id} post={post} index={index} />*/}
        {/*  ))}*/}
        {/*</Grid>*/}
      </Container>
    </Page>
  );
}
