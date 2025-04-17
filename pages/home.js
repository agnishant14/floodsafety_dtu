import Landing from "@/components/landing";
import React from "react";
import Layout from "@/components/Layout";
const LandingPage = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Landing />
    </div>
  );
};
LandingPage.getLayout = function getLayout(page) {
  return (
    <Layout height="auto" footerLanding={true}>
      {page}
    </Layout>
  );
};
export default LandingPage;
