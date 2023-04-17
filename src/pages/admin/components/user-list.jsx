import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

// Xem list User (GET): http://localhost:3000/api/v1/admin/users
// Promote User lên Admin (PATCH): http://localhost:3000/api/v1/admin/users/promote-user/6411dea7be5aad470acee95a
// Upgrade User lên Premium: http://localhost:3000/api/v1/admin/users/upgrade-user/6411dea7be5aad470acee95a
// Admin Set API
// Approve (PATCH): http://localhost:3000/api/v1/sets/approve/641df266947729d86f55c5fa
// Get List Set (GET): http://localhost:3000/api/v1/sets/get-all-sets

const UserList = () => {
  const [users, setUsers] = useState();
  const getUsers = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/admin/users"
    );
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  console.log(users);
  return <div>UserList</div>;
};

export default UserList;
