import HeatMap from "@/components/HeatMap";
import "react-select-search/style.css";
import Layout from "@/components/Layout";
import LandingPage from "./home";
export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  );
}
Home.getLayout = function getLayout(page) {
  return (
    <Layout height="auto" footerLanding={true}>
      {page}
    </Layout>
  );
};
