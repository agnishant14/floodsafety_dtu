import React from "react";
import Layout from "@/components/Layout";
const success = () => {
  return (
    <div style={{}}>Kindly check your email id to reset the password.</div>
  );
};
success.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default success;
