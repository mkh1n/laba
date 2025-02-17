import { Provider } from 'react-redux';
import store from '../storage/store';
import { AuthProvider } from '../context/AuthContext.js';
import '../styles/styles.css';
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider> 
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;