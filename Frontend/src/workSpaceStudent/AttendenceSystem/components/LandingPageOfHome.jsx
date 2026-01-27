import React from 'react'
import DashboardLayout from "./src/layout/DashBoardLayout.jsx";
import DashboardHome from "./src/pages/DashboardHome.jsx";


const LandingPageOfHome = () => {
    return (
        <DashboardLayout>
            <DashboardHome />
        </DashboardLayout>
    );
}

export default LandingPageOfHome;


