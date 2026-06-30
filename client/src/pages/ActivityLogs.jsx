import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const ActivityLogs = () => {

    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadLogs();

    }, []);

    const loadLogs = async () => {

        try {

            const res = await API.get("/activity");

            setLogs(res.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <h2>Activity Logs</h2>

                {loading ? (

                    <h3>Loading...</h3>

                ) : (

                    <table className="table">

                        <thead>

                            <tr>

                                <th>User</th>

                                <th>Role</th>

                                <th>Action</th>

                                <th>Date</th>

                            </tr>

                        </thead>

                        <tbody>

                            {logs.length === 0 ? (

                                <tr>

                                    <td colSpan="4">

                                        No Activity Found

                                    </td>

                                </tr>

                            ) : (

                                logs.map((log) => (

                                    <tr key={log._id}>

                                        <td>

                                            {log.user?.name}

                                        </td>

                                        <td>

                                            {log.role}

                                        </td>

                                        <td>

                                            {log.action}

                                        </td>

                                        <td>

                                            {new Date(log.createdAt).toLocaleString()}

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                )}

            </div>

        </div>

    );

};

export default ActivityLogs;