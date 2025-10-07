import UsersTable from "../components/ui/users-table/UsersTable";

const Users = () => {
  return (
    <div className="w-full px-4 py-6 md:px-8">
      <div className="mx-auto w-full space-y-4">
        <UsersTable />
      </div>
    </div>
  );
};

export default Users;
