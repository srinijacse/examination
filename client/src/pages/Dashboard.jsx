import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../components/Navbar.css";
import "../components/Sidebar.css";
import "../styles/dashboard.css";

const Dashboard = () => {

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFaculty: 0,
    totalSubjects: 0,
    totalExams: 0,
    totalHallTickets: 0,
    totalMarks: 0,
    approvedResults: 0,
    pendingResults: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {

      const response = await API.get("/dashboard/admin");

      setStats(response.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h2>;
  }

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <h2>Admin Dashboard</h2>

        <div className="cards">

          <div className="card">
            <h3>Total Students</h3>
            <h1>{stats.totalStudents}</h1>
          </div>

          <div className="card">
            <h3>Total Faculty</h3>
            <h1>{stats.totalFaculty}</h1>
          </div>

          <div className="card">
            <h3>Total Subjects</h3>
            <h1>{stats.totalSubjects}</h1>
          </div>

          <div className="card">
            <h3>Total Exams</h3>
            <h1>{stats.totalExams}</h1>
          </div>

          <div className="card">
            <h3>Hall Tickets</h3>
            <h1>{stats.totalHallTickets}</h1>
          </div>

          <div className="card">
            <h3>Total Marks</h3>
            <h1>{stats.totalMarks}</h1>
          </div>

          <div className="card green">
            <h3>Approved Results</h3>
            <h1>{stats.approvedResults}</h1>
          </div>

          <div className="card red">
            <h3>Pending Results</h3>
            <h1>{stats.pendingResults}</h1>
          </div>

        </div>

      </div>

    </div>

  );

};

export default Dashboard;