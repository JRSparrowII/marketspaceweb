import React from 'react';
import { Route, Routes} from 'react-router-dom';

import SignIn from '../pages';
import Home from '../pages';
import NewAnnouncement from '../pages';
import Preview from '../pages';
import ProductDetails from '../pages';

function AppRoutes() {
  <Routes>
    <Route path={'/'} element={<SignIn/>} />
    <Route path={'/home'} element={<Home/>} />
    <Route path={'/newannouncement'} element={<NewAnnouncement/>} />
    <Route path={'/preview'} element={<Preview/>} />
    <Route path={'/productdetails'} element={<ProductDetails/>}/>
  </Routes>
};

export default AppRoutes;