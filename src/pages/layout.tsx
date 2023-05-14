import React from "react";

function Layout({ children }: { children: React.ReactElement }) {
  return <div className="bg-[#151515]">{children}</div>;
}

export default Layout;
