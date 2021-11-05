import React from 'react';
import { Route, Routes } from 'react-router-dom'
// import { authRoutes, publicRoutes, Router } from '../routes'
import { Router } from '../routes'
import {SHOP_ROUTE} from "../utils/consts";

const AppRouter = () => {

  //todo isAuth from localStorage it`s TOKEN

  const isAuth = true
  return (
      <Router />
    // <Routes>
    //   {isAuth && authRoutes.map((e) => <Route key={e.path} {...e} />)}
    //   {publicRoutes.map((e) => <Route key={e.path} {...e} />)}
    //   <Redirect to={SHOP_ROUTE} />
    // </Routes>
  );
};

export default AppRouter;
