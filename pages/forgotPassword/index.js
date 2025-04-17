import Button from "@/components/Button";
import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
const ForgotPassword = () => {
  const router = useRouter();
  return (
    <div
      style={{
        width: "25%",
        background: "rgb(249,249,249)",
        padding: "4vh 1vw",
      }}
    >
      <p style={{ fontSize: "1.5vw", letterSpacing: "1px" }}>Forgot Password</p>
      <input
        type="email"
        name="email"
        id="email"
        style={{
          width: "100%",
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "0.5vw 1vw ",
          margin: "2vh 0",
          outline: "none",
        }}
        placeholder="Enter the registered email address"
      />
      <div onClick={() => router.push("/forgotPassword/success")}>
        <Button text={"Reset"} alignment="center" width="5vw" />
      </div>
    </div>
  );
};
ForgotPassword.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default ForgotPassword;
