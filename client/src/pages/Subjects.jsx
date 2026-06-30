import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const Subjects = () => {

    const [formData, setFormData] = useState({
        subjectName: "",
        subjectCode: "",
        semester: "",
        credits: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await API.post("/exam/subject", formData);

            setMessage("Subject Created Successfully");

            setFormData({
                subjectName: "",
                subjectCode: "",
                semester: "",
                credits: ""
            });

        } catch (err) {

            setMessage(
                err.response?.data?.message ||
                "Something went wrong"
            );

        }

    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Navbar />

                <h2>Create Subject</h2>

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

                    <input
                        type="text"
                        name="subjectName"
                        placeholder="Subject Name"
                        value={formData.subjectName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="subjectCode"
                        placeholder="Subject Code"
                        value={formData.subjectCode}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="semester"
                        placeholder="Semester"
                        value={formData.semester}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="credits"
                        placeholder="Credits"
                        value={formData.credits}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Create Subject
                    </button>

                </form>

            </div>

        </div>

    );

};

export default Subjects;