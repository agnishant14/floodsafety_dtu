import LoginComp from "@/components/login";
import React from "react";
import Layout from "@/components/Layout";
const register = () => {
  return (
    <div style={{ width: "35%" }}>
      <LoginComp type="register" />
    </div>
  );
};
register.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default register;
