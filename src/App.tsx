import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.css';
import Layout from './components/Layout';
import Routes from './components/Routes';
import StoreContextProvider from './Store';

function App(): ReactElement {
  return (
    <StoreContextProvider>
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </StoreContextProvider>
  );
}

export default App;
