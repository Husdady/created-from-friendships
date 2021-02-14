import React, {Fragment, useState} from 'react';

/* Components */
import Header from './header/Header';
import Friendship from './main/Friendship';
import Footer from './footer/Footer';

const App = () => {
  return (
    <Fragment>
    <Header />
    <Friendship />
    <Footer />
    </Fragment>
  );
}

export default App;