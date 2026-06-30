import { useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/dashboard.css";

const AddExam = () => {

  const [formData, setFormData] = useState({
    examName: "",
    examType: "",
    semester: "",
    startDate: "",
    endDate: ""
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

    try{

      await API.post("/exam/exam", formData);

      setMessage("Exam Created Successfully");

      setFormData({
        examName:"",
        examType:"",
        semester:"",
        startDate:"",
        endDate:""
      });

    }catch(err){

      setMessage(
        err.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  return(

    <div className="dashboard">

      <Sidebar/>

      <div className="dashboard-content">

        <Navbar/>

        <h2>Add Exam</h2>

        {message &&

          <p
          style={{
            marginBottom:"20px",
            color:"green"
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
          type="text"
          name="examName"
          placeholder="Exam Name"
          value={formData.examName}
          onChange={handleChange}
          required
          />

          <input
          type="text"
          name="examType"
          placeholder="Exam Type"
          value={formData.examType}
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
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
          />

          <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
          />

          <button>

            Create Exam

          </button>

        </form>

      </div>

    </div>

  );

};

export default AddExam;