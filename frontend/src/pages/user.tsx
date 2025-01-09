import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers } from "../redux/user/actions"; // Assuming GetAllUsers action is imported

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

const UsersPage: React.FC = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);

  // Fetch the users from the Redux store
  const allUsers = useSelector((state: any) => state?.User?.allUsers);

  // Fetch users on component mount
  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);

  // Transform the data to match the expected format
  useEffect(() => {
    if (allUsers?.data) {
      const transformedUsers = allUsers.data.map((user: any) => ({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      }));
      setUsers(transformedUsers);
    }
  }, [allUsers]);

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div className="p-4">
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </div>
  );
};

export default UsersPage;
