import '../styles/globals.css';
import 'highlight.js/styles/vs2015.css'
import {GoogleAnalytics} from 'nextjs-google-analytics'
import PageTransition from '@/components/PageTransition';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  
    return (

        <div className="relative overflow-hidden">
          <Head>
<meta name="google-site-verification" content="X9VNHlSHe3gZgLhbrxy1m63nEUuU996fT93Kedbafw0" />
          </Head>
          <GoogleAnalytics trackPageViews />
          <PageTransition>

        <Component {...pageProps} />
          </PageTransition>
      
        </div>
       
    );
}

export default MyApp;
