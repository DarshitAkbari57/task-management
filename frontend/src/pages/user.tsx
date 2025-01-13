import React, { useEffect, useState } from "react";
import { Select, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUsers, updatePermission } from "../redux/user/actions"; // Assuming GetAllUsers action is imported

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  permissions: string[];
}

const permissionOptions: any = [
  {
    value: "add",
    label: "Add",
  },
  {
    value: "edit",
    label: "Edit",
  },
  {
    value: "delete",
    label: "Delete",
  },
];

const UsersPage: React.FC = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<User[]>([]);

  // Fetch the users from the Redux store
  const allUsers = useSelector((state: any) => state?.User?.allUsers);

  const handleStatusChange = async (id: string, value: string) => {
    const user = users.find((user) => user._id === id);
    console.log("taskId", id);
    console.log("taskId newStatus", value);
    if (user) {
      const updatedData = {
        role: user.role,
        username: user.username,
        email: user.email,
        permissions: value, // value is the array of selected permissions
      };

      try {
        // Dispatch the action to update the permission
        const res = await dispatch(updatePermission(id, updatedData));
        console.log("API response:", res);
        // Optionally handle success or failure here (e.g., show a notification)
      } catch (err) {
        console.error("Error updating permission:", err);
      }
    }
  };

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
        permissions: user?.permissions || [],
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
    {
      title: "Permission",
      key: "permission",
      render: (_: any, record: any) => (
        <Select
          mode="multiple"
          allowClear
          style={{ width: "250px" }}
          placeholder="Please select"
          onChange={(value) => handleStatusChange(record._id, value)}
          options={permissionOptions}
        />
      ),
    },
  ];

  return (
    <div className="p-4">
      <Table columns={columns} dataSource={users} rowKey="_id" />
    </div>
  );
};

export default UsersPage;
