import Navbar from "../components/Navbar";
import { useGetProfileQuery, useLogoutApiMutation } from "../services/users";
import { useDispatch } from "react-redux";
import { logout } from "../services/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { data, isLoading, error } = useGetProfileQuery();
  const [logoutApiCall] = useLogoutApiMutation();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap(); // Clears Cookie on Backend
      dispatch(logout()); // Clears State on Frontend
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Please Login to view Profile</div>;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-10">
        <h1 className="text-3xl font-bold mb-4">User Profile</h1>
        <div className="bg-gray-100 p-6 rounded-lg">
          <p><strong>Name:</strong> {data?.user?.name}</p>
          <p><strong>Email:</strong> {data?.user?.email}</p>
          <p><strong>Role:</strong> {data?.user?.role}</p>
          
          <button 
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-6 py-2 rounded font-bold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;