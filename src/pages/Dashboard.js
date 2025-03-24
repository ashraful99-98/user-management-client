import React, { useContext } from "react";
import UserTable from "../components/UserTable";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="container">
            <UserTable isAuthenticated={isAuthenticated} />
        </div>
    );
};

export default Dashboard;
