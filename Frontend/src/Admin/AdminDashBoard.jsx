import React from 'react';
import StatsCard from './StatsCard';
import StudentTable from './StudentTable';
import { StoreAdminContext } from './store/store.jsx';
import { useContext } from 'react';
const Dashboard = () => {
    const { dispatch, state } = useContext(StoreAdminContext);
    const { studentList } = state;
    const total = studentList?.length;
    const active = studentList?.filter(s => s.status?.label === 'Active').length;
    const inactive = studentList?.filter(s => s.status?.label === 'Inactive').length;
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
            {
                total ? <StudentTable students={studentList} /> : <p className='text-white font-semibold md:pl-7'>*No any student are added</p>
            }
        </>
    );
};

export default Dashboard;
