"use client"
import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff, MdEdit, MdDelete } from 'react-icons/md';
import EditModal from './EditModal/EditModal';


const BodyChildren = ({ tableData, onDelete,searchQuery, onCurrentVisibleStatus,setSearchQuery }) => {
  const tableHeaders = [
    'Name',
    'Publish Date',
    'Status',
    'Season',
    'Action',
  ];
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(tableData.length / entriesToShow);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = startIndex + entriesToShow;
  const currentData = tableData.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Perform your search logic here
  };

  const handleEntriesChange = (e) => {
    setEntriesToShow(parseInt(e.target.value, 10));
    // Perform any logic related to changing the number of entries to display
  };

  const handleEditClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <EditModal isOpen={isModalOpen} onClose={handleEditClick} /> {/* Render the EditModal component */}
      <div className="overflow-x-auto">
        <div className="flex my-4 justify-between items-center">
          <div >
            <label className="block text-sm font-medium text-zinc-300">Show entries:</label>
            <select
              name="entriesToShow"
              className="mt-1 p-1 border bg-slate-800 rounded w-full"
              value={entriesToShow}
              onChange={handleEntriesChange}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div >
            <label className="block text-sm font-medium text-zinc-300">Search:</label>
            <input
              type="text"
              name="search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="mt-1 p-1 border bg-slate-800 rounded w-40"
              placeholder="Enter search query"
            />
          </div>
        </div>
        <table className="min-w-full table-auto border border-collapse">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  className="py-2 px-4 border border-gray-300 font-bold text-sm text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr key={row.id}>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {row?.title? row?.title.slice(0,20):"N/A"}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">{row.publisDate ? row.publisDate : "N/A"}</td>
                <td className="py-2 px-4 border border-gray-300 text-center">{row.status ? row.status : "N/A"}</td>
                <td className="py-2 px-4 border border-gray-300 text-center">{row.season ? row.season : "N/A"}</td>
                <td className="py-3 px-4 border border-gray-300 flex flex-row items-center justify-center">
                  {onCurrentVisibleStatus && (
                    <MdVisibilityOff
                      className="text-red-500 cursor-pointer mr-2"
                      onClick={() => onCurrentVisibleStatus(row._id, "disable")}
                    />
                  )}

                  {onCurrentVisibleStatus && (
                    <MdVisibility
                      className="text-green-500 cursor-pointer mr-2"
                      onClick={() => onCurrentVisibleStatus(row._id, "enable")}
                    />
                  )}

                  <MdEdit className="text-blue-500 cursor-pointer mr-2" onClick={handleEditClick} /> {/* Add onClick event for opening the modal */}

                  {onDelete && (
                    <MdDelete
                      className="text-red-500 cursor-pointer"
                      onClick={() => onDelete(row._id)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`pagination-item py-2 px-4 mx-1 rounded ${currentPage === index + 1 ? 'bg-gray-400 text-white' : ''
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodyChildren;
