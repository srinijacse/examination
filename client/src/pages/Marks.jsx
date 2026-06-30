import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

const Marks = () => {

  const { user } = useAuth();

  const [results, setResults] = useState([]);

  const [formData, setFormData] = useState({
    studentId: "",
    subjectId: "",
    examId: "",
    marksObtained: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {

    if (user?.role === "student") {

      loadResults();

    }

  }, []);

  const loadResults = async () => {

    try {

      const res = await API.get("/marks/my-results");

      setResults(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/marks/add", formData);

      setMessage("Marks Added Successfully");

      setFormData({
        studentId: "",
        subjectId: "",
        examId: "",
        marksObtained: ""
      });

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Unable to add marks"
      );

    }

  };

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        {user?.role === "faculty" && (

          <>

            <h2>Add Marks</h2>

            {message &&

              <p
                style={{
                  color: "green",
                  marginBottom: "20px"
                }}
              >
                {message}
              </p>

            }

            <form
              className="exam-form"
              onSubmit={handleSubmit}
            >

              <input
                name="studentId"
                placeholder="Student ID"
                value={formData.studentId}
                onChange={handleChange}
                required
              />

              <input
                name="subjectId"
                placeholder="Subject ID"
                value={formData.subjectId}
                onChange={handleChange}
                required
              />

              <input
                name="examId"
                placeholder="Exam ID"
                value={formData.examId}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="marksObtained"
                placeholder="Marks"
                value={formData.marksObtained}
                onChange={handleChange}
                required
              />

              <button>

                Submit Marks

              </button>

            </form>

          </>

        )}

        {user?.role === "student" && (

          <>

            <h2>My Results</h2>

            <table className="table">

              <thead>

                <tr>

                  <th>Exam</th>
                  <th>Subject</th>
                  <th>Code</th>
                  <th>Marks</th>

                </tr>

              </thead>

              <tbody>

                {results.map((item) => (

                  <tr key={item._id}>

                    <td>

                      {item.exam?.examName}

                    </td>

                    <td>

                      {item.subject?.subjectName}

                    </td>

                    <td>

                      {item.subject?.subjectCode}

                    </td>

                    <td>

                      {item.marksObtained}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </>

        )}

        {user?.role === "admin" && (

          <>

            <h2>Marks Approval</h2>

            <p>

              Your backend currently provides only

              <strong> PUT /marks/approve/:id </strong>

              but no API to fetch pending marks.

            </p>

            <p>

              Therefore approval UI cannot be implemented
              until a GET endpoint for pending marks exists.

            </p>

          </>

        )}

      </div>

    </div>

  );

};

export default Marks;