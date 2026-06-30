import {
  FaHome,
  FaBook,
  FaUsers,
  FaClipboardList,
  FaIdCard,
  FaUser,
  FaHistory
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

import "./Sidebar.css";

const Sidebar = () => {

  const location = useLocation();

  const menu = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard"
    },
    {
    title: "Subjects",
    icon: <FaBook />,
    path: "/subjects"
},
    {
      title: "Exams",
      icon: <FaBook />,
      path: "/exams"
    },
    {
      title: "Students",
      icon: <FaUsers />,
      path: "/students"
    },
    {
      title: "Marks",
      icon: <FaClipboardList />,
      path: "/marks"
    },
    {
      title: "Hall Tickets",
      icon: <FaIdCard />,
      path: "/halltickets"
    },
    {
      title: "Activity Logs",
      icon: <FaHistory />,
      path: "/activitylogs"
    },
    {
      title: "Profile",
      icon: <FaUser />,
      path: "/profile"
    }
  ];

  return (

    <div className="sidebar">

      <h2>EMS</h2>

      {menu.map((item) => (

        <Link
          key={item.path}
          to={item.path}
          className={
            location.pathname === item.path
              ? "sidebar-link active"
              : "sidebar-link"
          }
        >
          {item.icon}

          <span>{item.title}</span>

        </Link>

      ))}

    </div>

  );

};

export default Sidebar;