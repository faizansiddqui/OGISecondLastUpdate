"use client"; // Make sure the root layout is also a client component

import store from '@/store/store';
import { Provider } from 'react-redux';

function RootLayout({ children, Component, pageProps}) {
  return (
    <html lang="en">
      <head>
        <title>My Lawyer</title>
      </head>
      <body>
        <Provider store={store}>
            {children}
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
