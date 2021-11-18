import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  //delete and user
  const handleDeleteUser = (id) => {
    const proceed = window.confirm("Are you sure to delete the user?");
    if (proceed) {
      const url = `http://localhost:5000/users/${id}`;

      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("Deleted Successfully !");
            const remainingUsers = users.filter((user) => user._id !== id);
            setUsers(remainingUsers);
          }
        });
    }
  };

  return (
    <div>
      <h2>Avilable Users : {users.length}</h2>
      <ul style={{ listStyleType: "none" }}>
        {users.map((user, index) => (
          <li key={user._id}>
            {index + 1}... {user.name} ::: {user.email}{" "}
            <Link to={`/users/update/${user._id}`}><button style={{ margin: "10px 2px" }}>Update</button></Link>
            <button onClick={() => handleDeleteUser(user._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
