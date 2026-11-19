import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "../components/DashboardSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mx-auto w-full max-w-[1440px] flex-1 px-[5%] py-6 md:px-8 md:py-8">
          <SidebarTrigger className="mb-5 ml-[-6px]" />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
