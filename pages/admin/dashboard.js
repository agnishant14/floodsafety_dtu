import React from "react";
import Layout from "@/components/Layout";
import DashboardComp from "@/components/dashboardComp";
import { get_shelters } from "@/utils/api_call";
const dashboard = ({shelters}) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DashboardComp shelters={shelters} />
    </div>
  );
};
dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default dashboard;

export async function getServerSideProps(context) {

  const shelters = await get_shelters()

  return {
    props: { shelters},
  };
}