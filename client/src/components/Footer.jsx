const Footer = () => {

    return (

        <footer
        style={{
            marginTop:"30px",
            padding:"20px",
            textAlign:"center",
            background:"#fff",
            borderTop:"1px solid #ddd"
        }}
        >

            © {new Date().getFullYear()} Examination Management System

        </footer>

    );

};

export default Footer;