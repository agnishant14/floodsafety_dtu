import React from "react";
import Layout from "@/components/Layout";
import LoginComp from "@/components/login";
const login = () => {
  return (
    <div style={{ width: "35%" }}>
      <LoginComp type="login" />
    </div>
  );
};
login.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default login;
