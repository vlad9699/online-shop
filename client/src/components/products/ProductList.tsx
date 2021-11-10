import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard'
// import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------
const products = [
  {name: 'Nike airmax', desc: 'ultraGood', price: '155', cover: '/assets/sneakers/sneaker-1.jpg', status: 'sale', priceSale: '100'},
  {name: 'Nike airmax',desc: 'ultraGood', price: '67', cover: '/assets/sneakers/sneaker-2.jpg', status: 'new'},
  {name: 'Nike airmax', desc: 'ultraGood',price: '32', cover: '/assets/sneakers/sneaker-3.jpg', status: ''},
  {name: 'Nike airmax', desc: 'ultraGood',price: '89', cover: '/assets/sneakers/sneaker-4.jpg', status: ''},
  {name: 'Nike airmax', desc: 'ultraGood',price: '12', cover: '/assets/sneakers/sneaker-5.jpg', status: ''},
  {name: 'Nike airmax', desc: 'ultraGood',price: '181', cover: '/assets/sneakers/sneaker-6.jpg', status: 'new'},

]


export default function ProductList({...other}:any) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product, i) => (
        <Grid key={i} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
