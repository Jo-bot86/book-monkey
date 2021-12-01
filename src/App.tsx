import React, { ReactElement, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.css';
import Layout from './components/Layout';
import Routes from './components/Routes';

function App(): ReactElement {
  return (
    <Router>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}

export default App;
