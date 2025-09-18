import React from 'react';
import StatsCard from './StatsCard';
import StudentTable from './StudentTable';

const Dashboard = () => {
    const students = [
        { name: 'Saurabh Sharma', email: 'example@mail.com', status: 'Active' },
        { name: 'Rituraj Sharma', email: 'randi@mail.com', status: 'Inactive' },
        { name: 'Yashpal Kumar', email: 'denewala@mail.com', status: 'Active' },
        { name: 'Aashish Gupta', email: 'kalDega@mail.com', status: 'Inactive' },
    ];

    const total = students.length;
    const active = students.filter(s => s.status === 'Active').length;
    const inactive = students.filter(s => s.status === 'Inactive').length;

    return (
        <div className="min-h-screen bg-gray-900 p-8">
            <h1 className="md:text-3xl text-[20px] text-white font-bold mb-6">Gemna.admin workspace</h1>
            <div className="flex flex-col md:flex-row gap-6 mb-6">
                <StatsCard title="Total Students" count={total} type="total" />
                <StatsCard title="Active Accounts" count={active} type="active" />
                <StatsCard title="Deactivated Accounts" count={inactive} type="inactive" />
            </div>
            <StudentTable students={students} />
        </div>
    );
};

export default Dashboard;
