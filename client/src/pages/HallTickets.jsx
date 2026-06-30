import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import "../styles/dashboard.css";

const HallTickets = () => {

    const { user } = useAuth();

    const [hallTickets, setHallTickets] = useState([]);

    const [studentId, setStudentId] = useState("");
    const [examId, setExamId] = useState("");

    const [message, setMessage] = useState("");

    useEffect(() => {

        if(user?.role==="student"){

            fetchHallTickets();

        }

    },[]);

    const fetchHallTickets = async()=>{

        try{

            const res = await API.get("/hallticket/my");

            setHallTickets(res.data);

        }catch(err){

            console.log(err);

        }

    };

    const generateHallTicket = async(e)=>{

        e.preventDefault();

        try{

            const res = await API.post(
                "/hallticket/generate",
                {
                    studentId,
                    examId
                }
            );

            setMessage(res.data.message);

            setStudentId("");
            setExamId("");

        }catch(err){

            setMessage(
                err.response?.data?.message ||
                "Unable to Generate Hall Ticket"
            );

        }

    };

    return(

        <div className="dashboard">

            <Sidebar/>

            <div className="dashboard-content">

                <Navbar/>

                {user?.role==="admin" && (

                    <>

                        <h2>Generate Hall Ticket</h2>

                        {message &&

                        <p
                        style={{
                            color:"green",
                            marginBottom:"20px"
                        }}
                        >
                            {message}
                        </p>

                        }

                        <form
                        className="exam-form"
                        onSubmit={generateHallTicket}
                        >

                            <input
                            placeholder="Student ID"
                            value={studentId}
                            onChange={(e)=>setStudentId(e.target.value)}
                            required
                            />

                            <input
                            placeholder="Exam ID"
                            value={examId}
                            onChange={(e)=>setExamId(e.target.value)}
                            required
                            />

                            <button>

                                Generate

                            </button>

                        </form>

                    </>

                )}

                {user?.role==="student" && (

                    <>

                        <h2>My Hall Tickets</h2>

                        <table className="table">

                            <thead>

                                <tr>

                                    <th>Student</th>
                                    <th>Exam</th>
                                    <th>Hall Ticket Id</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    hallTickets.length===0 ?

                                    (

                                        <tr>

                                            <td
                                            colSpan="3"
                                            >
                                                No Hall Ticket
                                            </td>

                                        </tr>

                                    )

                                    :

                                    hallTickets.map(ticket=>(

                                        <tr
                                        key={ticket._id}
                                        >

                                            <td>

                                                {ticket.student?.name}

                                            </td>

                                            <td>

                                                {ticket.exam?.examName}

                                            </td>

                                            <td>

                                                {ticket._id}

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </>

                )}

            </div>

        </div>

    );

};

export default HallTickets;