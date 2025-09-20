import React from 'react';

const StudentTable = ({ students }) => {
  return (
    <div className='w-full md:h-[600px] h-auto bg-red-600 md:overflow-y-scroll'>
      <div className="overflow-x-auto ">
        <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Description</th>
              <th className="p-4">status</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((product) => (
              <tr
                key={product.id}
                className="border-t border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-contain"
                  />
                </td>
                <td className="p-4 font-medium text-gray-900">{product.title}</td>
                <td className="p-4 text-gray-700">{product.category}</td>
                <td className="p-4 text-gray-600 max-w-xs truncate">{product.description}</td>
                <td className="p-4 text-indigo-600 font-semibold">{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default StudentTable;
