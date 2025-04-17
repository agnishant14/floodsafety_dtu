import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import NextNProgress from 'nextjs-progressbar';
import React from "react";
import Router from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  console.log(getLayout);


  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return <>
   <NextNProgress />
   <ToastContainer />
  {  loading ? <Loader/> : getLayout(<Component {...pageProps} />)}
  </>
;
}
