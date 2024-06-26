import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
