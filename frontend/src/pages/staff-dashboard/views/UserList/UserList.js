import React, { useState } from "react";

const UserList = () => {
  // State to hold the list of users
  const [users, setUsers] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ]);

  // Function to handle deleting a user
  const handleDelete = (userId) => {
    // Filter the users array to remove the user with the given ID
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    // Additional logic for handling the delete operation
    // You can show a confirmation dialog, make an API call to delete the user, etc.
  };

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
