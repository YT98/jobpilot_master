import '../styles/index.css'
import { AppProps } from 'next/app';
import AppProvider from '../contexts/AppContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
        <Component {...pageProps} />
    </AppProvider>
  )
};

export default MyApp;
