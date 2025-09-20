import React from 'react';
import StatsCard from './StatsCard';
import StudentTable from './StudentTable';
import { StoreAdminContext } from './store/store.jsx';
import { useContext } from 'react';
const Dashboard = () => {
    const { dispatch, state } = useContext(StoreAdminContext);
    const { studentList } = state;

    // transform the data
    const MappedData = studentList?.map((item, index) => {
        if (index % 2 == 0) {
            return { ...item, status: "Active" };
        } else {
            return { ...item, status: "Inactive" }
        }
    });
    console.log(MappedData);
    const total = MappedData?.length;
    const active = MappedData?.filter(s => s.status === 'Active').length;
    const inactive = MappedData?.filter(s => s.status === 'Inactive').length;

    return (
        <>
            <div className="h-auto w-full bg-gray-900 md:p-8 p-8">
                <h1 className="md:text-3xl text-[20px] text-white font-bold mb-6">Gemna.admin workspace</h1>
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <StatsCard title="Total Students" count={total} type="total" />
                    <StatsCard title="Active Accounts" count={active} type="active" />
                    <StatsCard title="Deactivated Accounts" count={inactive} type="inactive" />
                </div>
            </div>
            <StudentTable students={MappedData} />
        </>
    );
};

export default Dashboard;
