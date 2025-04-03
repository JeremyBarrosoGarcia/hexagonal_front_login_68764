import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { AuthServiceImpl } from "../../infrastructure/services/AuthServiceImpl";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-7xl md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  const authService = new AuthServiceImpl();
  const [isExpired, setIsExpired] = useState(authService.isTokenExpired());

  useEffect(() => {
    if (isExpired) {
      window.alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
    }
  }, [isExpired]);

  if (isExpired) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;