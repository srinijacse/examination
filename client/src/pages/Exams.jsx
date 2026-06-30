import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const Exams = () => {

  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    try {

      const res = await API.get("/exam/timetable");

      setTimetable(res.data);

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

        <h2>Exam Timetable</h2>

        {loading ? (

          <h3>Loading...</h3>

        ) : (

          <table className="table">

            <thead>

              <tr>

                <th>Exam</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Time</th>
                <th>Room</th>

              </tr>

            </thead>

            <tbody>

              {timetable.length === 0 ? (

                <tr>

                  <td colSpan="5">
                    No Timetable Available
                  </td>

                </tr>

              ) : (

                timetable.map((item) => (

                  <tr key={item._id}>

                    <td>
                      {item.exam?.examName}
                    </td>

                    <td>
                      {item.subject?.subjectName}
                    </td>

                    <td>
                      {item.examDate}
                    </td>

                    <td>
                      {item.examTime}
                    </td>

                    <td>
                      {item.roomNumber}
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

export default Exams;