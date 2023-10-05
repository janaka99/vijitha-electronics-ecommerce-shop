import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-5 m-12">
      <a href="/admin-dashboard/inventory">Inventory</a>
      <a href="/admin-dashboard/manage-orders">Manage orders</a>
      <a href="/admin-dashboard/sales">Sales</a>
      <a href="/admin-dashboard/sales-summary">Sales-summary</a>
      <a href="/admin-dashboard/super-admin/manage-employee">
        manage-employees
      </a>
    </div>
  );
};

export default page;
