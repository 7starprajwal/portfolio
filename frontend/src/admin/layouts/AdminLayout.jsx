import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex min-h-screen flex-col lg:ml-64">
        {/* Top Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 pt-20 lg:p-6 lg:pt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;