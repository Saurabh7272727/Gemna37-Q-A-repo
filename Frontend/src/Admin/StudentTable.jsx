import React from 'react';

const StudentTable = ({ students }) => {
  return (
    <div className="mt-6 bg-white shadow-md rounded-lg overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
          <tr>
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Email</th>
            <th className="py-3 px-6">Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={idx} className="border-b text-black hover:bg-gray-50">
              <td className="py-3 px-6">{student.name}</td>
              <td className="py-3 px-6">{student.email}</td>
              <td className="py-3 px-6">
                <span className={`px-3 py-1 text-sm rounded-full font-medium ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {student.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
