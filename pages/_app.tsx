import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { MantineProvider, createTheme, ColorSchemeScript } from '@mantine/core';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import { persistor, store } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import { LoadingProvider } from '@/components/Loading';
import i18n from '@/libs/i18n';
import { ModalProvider } from '@/components/context/ModalsContextProvider';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'blue',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <LoadingProvider>
              <ModalProvider>
                <Head>
                  <meta charSet="UTF-8" />
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>Next Admin Panel</title>
                  <ColorSchemeScript />
                </Head>
                <Component {...pageProps} />
              </ModalProvider>
            </LoadingProvider>
          </I18nextProvider>
        </PersistGate>
      </MantineProvider>
    </Provider>
  );
}
