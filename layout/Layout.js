import React from "react";
import { MyAppBar } from "./MyAppBar";
import { ScrollToTop } from "./ScrollToTop";
import { useRouter } from "next/router";

export const Layout = (props) => {
  const router = useRouter();
  return (
    <div>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <MyAppBar />
          {props.children}
          <ScrollToTop />
        </main>
      </div>
    </div>
  );
};
