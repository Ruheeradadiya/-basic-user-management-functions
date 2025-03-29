import { useState } from 'react';
import UserForm from './UserForm';
import { deleteUser, updateUser } from '../services/api';

const UserCard = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      setMessage('User deleted successfully');
      // In a real app, you would refresh the user list here
    } catch (err) {
      setMessage(err.message || 'Failed to delete user');
    }
  };

  const handleUpdate = async (updatedUser) => {
    try {
      await updateUser(user.id, updatedUser);
      setMessage('User updated successfully');
      setIsEditing(false);
      // In a real app, you would refresh the user list here
    } catch (err) {
      setMessage(err.message || 'Failed to update user');
    }
  };

  return (
    <div className="user-card">
      {isEditing ? (
        <UserForm user={user} onSubmit={handleUpdate} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
          <h3>{user.first_name} {user.last_name}</h3>
          <p>{user.email}</p>
          <div className="actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UserCard;