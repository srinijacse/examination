import { Link } from "react-router-dom";

const NotFound = () => {

    return (

        <div
        style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
            flexDirection:"column"
        }}
        >

            <h1
            style={{
                fontSize:"70px"
            }}
            >
                404
            </h1>

            <h2>

                Page Not Found

            </h2>

            <Link
            to="/dashboard"
            style={{
                marginTop:"20px",
                color:"#2563eb",
                fontSize:"18px"
            }}
            >
                Go Back
            </Link>

        </div>

    );

};

export default NotFound;