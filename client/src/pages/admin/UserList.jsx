import { useGetUsersQuery, useDeleteUserMutation } from "../../services/users";
import { User, Shield, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const UserList = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to delete user");
      }
    }
  };

  if (isLoading) return <div className="p-10 text-center text-gray-500">Loading Users...</div>;
  if (error) return <div className="p-10 text-center text-red-500">Error fetching users</div>;

  return (
    <div>
      <h1 className="text-3xl font-black text-[#111] mb-8">Users</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">User</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
              <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users?.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="font-bold text-sm text-[#111]">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                    {user.role === 'admin' ? (
                        <span className="px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 w-fit"><Shield size={10} /> Admin</span>
                    ) : (
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wide">Customer</span>
                    )}
                </td>
                <td className="p-5 text-right">
                   {user.role !== 'admin' && (
                     <button 
                       onClick={() => handleDelete(user._id)}
                       className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                       disabled={isDeleting}
                     >
                       {isDeleting ? <Loader2 className="animate-spin" size={18}/> : <Trash2 size={18} />}
                     </button>
                   )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;