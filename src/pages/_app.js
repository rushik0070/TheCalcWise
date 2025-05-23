import Head from 'next/head';
import "@/styles/globals.css";
import Footer from "@/components/pages/Footer";
import NavBar from "@/components/pages/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '@/loader/Loader';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    // When component mounts (initial page load)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // simulate delay for initial load

    // Router events for page navigation
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      clearTimeout(timer);
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router]);
  // })
  return(
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo/icon.webp" type="image/webp" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
        {/* You could also add Bootstrap CSS CDN here instead of npm import */}
      </Head>
      {loading && <Loader />}
      <NavBar />
      <Component {...pageProps} />
      <Footer />

      {/* Add Bootstrap JS bundle */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        defer
      ></script>
    </>
  );
}
