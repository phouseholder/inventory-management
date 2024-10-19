"use client";

import { useGetUsersQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-semibold text-gray-700">Users</h1>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;
