import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getAll = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/users/pagination?page=${currentPage}&page_size=10`);
        const responseData = response.data;

        setUsers(responseData.users);
        setTotalPages(responseData.total_pages);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getAll();
  }, [currentPage]);

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleDeleteSelected = async () => {
    try {
      await Promise.all(selectedUsers.map(async (userId) => {
        await axios.delete(`http://127.0.0.1:5000/delete/${userId}`);
      }));

      // Refresh the user list after deletion
      const response = await axios.get(`http://127.0.0.1:5000/users/pagination?page=${currentPage}&page_size=10`);
      const userData = response.data;

      setUsers(userData);
      setSelectedUsers([]);
    } catch (error) {
      console.error('Error deleting selected users:', error);
    }
  };

 

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Người Dùng</h2>
      <table className='w-11/12 text-sm text-center'>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-sky-400">Select</th>
            <th className="py-2 px-4 border-b border-sky-400">Username</th>
            <th className="py-2 px-4 border-b border-sky-400">Email</th>
            <th className="py-2 px-4 border-b border-sky-400">Password</th>
            <th className="py-2 px-4 border-b border-sky-400">Role</th>
            <th className="py-2 px-4 border-b border-sky-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onSelect={handleSelectUser}
              onDelete={(userId) => handleSelectUser(userId)}
            />
          ))}
        </tbody>
      </table>
      <div className="pagination flex justify-center my-5">
        <button className='border-2 border-stone-500 p-1' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span className=' p-1'> Page {currentPage} of {totalPages}</span>
        <button className='border-2 border-stone-500 p-1' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <button onClick={handleDeleteSelected}>Delete Selected</button>
    </div>
  );
};

export default UsersPage;
