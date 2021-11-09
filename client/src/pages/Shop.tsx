import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Stack, Typography } from '@mui/material';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
// import ShopProductCard from './ProductCard';

export default function Shop() {
  const [openFilter, setOpenFilter] = useState(false);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <Page title="Shop | Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        {/*<Stack*/}
        {/*  direction="row"*/}
        {/*  flexWrap="wrap-reverse"*/}
        {/*  alignItems="center"*/}
        {/*  justifyContent="flex-end"*/}
        {/*  sx={{ mb: 5 }}*/}
        {/*>*/}
        {/*  <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>*/}
        {/*    <ProductFilterSidebar*/}
        {/*      formik={formik}*/}
        {/*      isOpenFilter={openFilter}*/}
        {/*      onResetFilter={handleResetFilter}*/}
        {/*      onOpenFilter={handleOpenFilter}*/}
        {/*      onCloseFilter={handleCloseFilter}*/}
        {/*    />*/}
        {/*    <ProductSort />*/}
        {/*  </Stack>*/}
        {/*</Stack>*/}

        <ProductList />
        {/*<ProductCartWidget />*/}
      </Container>
    </Page>
  );
}

const products = [
  {title: 'Nike airmax', desc: 'ultraGood', price: '20'},
  {title: 'Nike airmax',desc: 'ultraGood', price: '20'},
  {title: 'Nike airmax', desc: 'ultraGood',price: '20'},
  {title: 'Nike airmax', desc: 'ultraGood',price: '20'},
  {title: 'Nike airmax', desc: 'ultraGood',price: '20'},
  {title: 'Nike airmax', desc: 'ultraGood',price: '20'},

]

function ProductList() {
  return (
    <Grid container spacing={3}>
      {products.map((product:any) => (
        <Grid key={product.length} item xs={12} sm={6} md={3}>
          <h1>{product.title}</h1>
          <p>{product.desc}</p>
          <p>{product.price}</p>
          {/*<ShopProductCard product={product} />*/}
        </Grid>
      ))}
    </Grid>
  );
}
