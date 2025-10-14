import React from 'react';

const StudentTable = ({ students }) => {
  return (
    <div className='w-full md:h-[600px] h-auto bg-gray-900 md:overflow-y-scroll'>
      <div className="overflow-x-auto ">
        <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">NAME</th>
              <th className="p-4">ROLL NUMBER</th>
              <th className="p-4">EMAIL</th>
              <th className="p-4">COURSE</th>
              <th className="p-4">YEAR</th>
              <th className="p-4">status</th>
            </tr>
          </thead>
          <tbody>
            {students?.reverse()?.map((product) => (
              <tr
                key={Math.random()}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-900">
                  {`${product?.firstName} ${product?.lastName}`}
                </td>
                <td className="p-4 font-medium text-gray-900">
                  {`${product?.rollNumber}`}
                </td>
                <td className="p-4 font-medium text-gray-900">{product?.email}</td>
                <td className="p-4 text-gray-700">{product?.course?.label}</td>
                <td className="p-4 text-gray-600 max-w-xs truncate">{product?.year?.label}</td>
                <td className="p-4 text-indigo-600 font-semibold">{product?.status?.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default StudentTable;
