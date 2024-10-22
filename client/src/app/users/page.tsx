"use client";

import { useGetUsersQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { PageHeader, CRUDModal } from "../(components)";
import { useUserCRUD } from "./useUserCRUD";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data: users, isError, isLoading } = useGetUsersQuery(searchTerm);
  const { newUser, handleCreateUser } = useUserCRUD();

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
      <PageHeader
        title="Users"
        createText="Create User"
        createOnClick={() => setIsCreateOpen(true)}
        searchPlaceholder="Search users..."
        searchTerm={searchTerm}
        searchOnChange={(e) => setSearchTerm(e.target.value)}
      />

      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />

      <CRUDModal
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreateUser}
        isOpen={isCreateOpen}
        data={newUser}
        fieldType="user"
      />
    </div>
  );
};

export default Users;
