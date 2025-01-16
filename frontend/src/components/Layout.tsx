import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function PageLayout() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
