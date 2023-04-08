import '../styles/index.css'
import { AppProps } from 'next/app';
import AppProvider from '../contexts/AppContext';
import Layout from '../components/layout';
import ResumeProvider from '../contexts/ResumeContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <ResumeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ResumeProvider>
    </AppProvider>
  )
};

export default MyApp;
