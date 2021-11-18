import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    //   const url = `http:localhost:5000/users/${id}`;

    fetch(`http://localhost:5000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, []);

  const handleNameChange = e => {
    const updatedName = e.target.value;
    const updatedUser = {name: updatedName, email: user.email};
    setUser(updatedUser)
  }
  const handleEmailChange = e => {
    const updatedEmail = e.target.value;
    const updatedUser = {...user};
    updatedUser.email = updatedEmail;
    setUser(updatedUser)
  }

  const handleUpdateUser = e => {
      
        const url = `http://localhost:5000/users/${id}`

        fetch(url, {
          method: 'PUT',
          headers: {
            'content-type' : 'application/json'
          },
          body: JSON.stringify(user)
        }) 
        .then(res => res.json())
         .then(data => {
           if(data.modifiedCount > 0) {
             alert('User Updated Successfully !')
           }
         })

         setUser({})
         e.preventDefault();
  }

  return (
    <div>
      <h2>Update User: {user.name} </h2>
      <p>id: {id}</p>
      <form onSubmit={handleUpdateUser}>
        <input type="text" value={user.name || ''} onChange={handleNameChange} />
        <input type="email" value={user.email || ''} onChange={handleEmailChange} />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
