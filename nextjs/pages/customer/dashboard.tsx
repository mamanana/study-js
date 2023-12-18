import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";
import { AuthLayout } from "@/components/Layout";

const Dashboard: NextPageWithLayout = () => {
  return <div>hello</div>;
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Dashboard
