import React from "react";
import Layout from "@/components/Layout";
const aboutUs = () => {
  return <div>About Us</div>;
};
aboutUs.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default aboutUs;
