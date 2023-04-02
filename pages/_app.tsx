import '../styles/index.css'
import { AppProps } from 'next/app';
import AppProvider from '../contexts/AppContext';
import Layout from '../components/layout';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </AppProvider>
  )
};

export default MyApp;
