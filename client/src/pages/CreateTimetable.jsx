import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const CreateTimetable = () => {

    const [subjects, setSubjects] = useState([]);
    const [exams, setExams] = useState([]);

    const [formData, setFormData] = useState({
        exam: "",
        subject: "",
        examDate: "",
        examTime: "",
        roomNumber: ""
    });

    const [message, setMessage] = useState("");

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            // These APIs must exist in backend
            const subjectRes = await API.get("/exam/subjects");
            const examRes = await API.get("/exam/exams");

            setSubjects(subjectRes.data);
            setExams(examRes.data);

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

            await API.post("/exam/timetable", formData);

            setMessage("Timetable Created Successfully");

            setFormData({
                exam: "",
                subject: "",
                examDate: "",
                examTime: "",
                roomNumber: ""
            });

        } catch (err) {

            setMessage(
                err.response?.data?.message ||
                "Failed to create timetable"
            );

        }

    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <h2>Create Timetable</h2>

                {message && (
                    <p
                        style={{
                            color: "green",
                            marginBottom: "20px"
                        }}
                    >
                        {message}
                    </p>
                )}

                <form
                    className="exam-form"
                    onSubmit={handleSubmit}
                >

                    <select
                        name="exam"
                        value={formData.exam}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Exam
                        </option>

                        {exams.map((exam) => (

                            <option
                                key={exam._id}
                                value={exam._id}
                            >
                                {exam.examName}
                            </option>

                        ))}

                    </select>

                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Subject
                        </option>

                        {subjects.map((subject) => (

                            <option
                                key={subject._id}
                                value={subject._id}
                            >
                                {subject.subjectName}
                            </option>

                        ))}

                    </select>

                    <input
                        type="date"
                        name="examDate"
                        value={formData.examDate}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="time"
                        name="examTime"
                        value={formData.examTime}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="roomNumber"
                        placeholder="Room Number"
                        value={formData.roomNumber}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">

                        Create Timetable

                    </button>

                </form>

            </div>

        </div>

    );

};

export default CreateTimetable;