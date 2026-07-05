import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Section */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <AdminNavbar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;