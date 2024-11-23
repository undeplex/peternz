import '../styles/globals.css';
import 'highlight.js/styles/vs2015.css'
import {GoogleAnalytics} from 'nextjs-google-analytics'
import PageTransition from '@/components/PageTransition';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  
    return (

        <div className="relative overflow-hidden">
          <Head>

          </Head>
          <GoogleAnalytics trackPageViews />
          <PageTransition>

        <Component {...pageProps} />
          </PageTransition>
      
        </div>
       
    );
}

export default MyApp;
