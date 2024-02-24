import axios from 'axios';
import React, { useState } from 'react';

const UserCard = ({ user, onSelect, onDelete }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleCheckboxChange = () => {
    setIsSelected(!isSelected);
    onSelect(user._id);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete =async () => {
    console.log('Confirming delete...');
    console.log(user._id)
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/delete/${user._id}`);
      console.log('Delete response:', response);
      onDelete(user._id);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <tr>
      <td className="py-2 px-4 border-b border-r border-sky-400">
        <input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} />
      </td>
      <td className="py-2 text-black px-4 border-b border-r border-sky-400">{user.userName}</td>
      <td className="py-2 text-black px-4 border-b border-r border-sky-400">{user.email}</td>
      <td className="py-2 text-black px-4 border-b border-r border-sky-400">{user.password}</td>
      <td className="py-2 text-black px-4 border-b border-r border-sky-400">{user.role}</td>
      <td className="py-2 text-black px-4 border-b border-r border-sky-400">
        <button onClick={handleDeleteClick}>Delete</button>
        {showDeleteConfirmation && (
          <div className="confirmation-modal">
            <p>Are you sure you want to delete this user?</p>
            <button className='mx-2 bg-lime-400' onClick={handleConfirmDelete}>Yes</button>
            <button className='mx-2 bg-red-600' onClick={handleCancelDelete}>No</button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default UserCard;
