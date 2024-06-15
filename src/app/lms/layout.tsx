import React from "react";

import LeftSidebar from "@/components/shared/_leftSidebar";
import MobileNav from "@/components/shared/navbar/MobileNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='md:flex min-h-screen w-full '>
      <MobileNav/>
      <LeftSidebar />
      <section className=' min-h-screen w-full p-4 md:p-5 md:px-10 py-16 '>
        <>{children}</>
      </section>
    </main>
  );
};

export default Layout;
