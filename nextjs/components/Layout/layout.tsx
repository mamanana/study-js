import type { ReactElement } from "react";
import React from "react";

const Layout = ({ children }: { children: ReactElement }) => {
  return <main>{children}</main>;
};

export default Layout;
