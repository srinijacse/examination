import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const Profile = () => {

    const { user } = useAuth();

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <div className="profile-card">

                    <h2>My Profile</h2>

                    <hr />

                    <p>
                        <strong>User ID :</strong>
                        {user?.id}
                    </p>

                    <p>
                        <strong>Role :</strong>
                        {user?.role}
                    </p>

                    <p>
                        <strong>Email :</strong>
                        {user?.email}
                    </p>

                </div>

            </div>

        </div>

    );

};

export default Profile;