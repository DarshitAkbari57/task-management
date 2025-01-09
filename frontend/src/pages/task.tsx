import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  createTask,
  DeleteTask,
  GetAllTask,
  UpdateTask,
  UpdateTaskStatus,
} from "../redux/task/action";
import { GetAllUsers } from "../redux/user/actions";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
}

const TaskPage: React.FC = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const [form] = Form.useForm(); // Form instance for Add/Edit Task

  const allUser = useSelector((state: any) => state?.User?.allUsers);
  const allTask = useSelector((state: any) => state?.Task?.allTask);

  const showAddModal = () => {
    setEditTask(null);
    form.resetFields(); // Reset form fields for new task
    setIsModalVisible(true);
  };

  const showEditModal = (task: Task) => {
    setEditTask(task);
    form.setFieldsValue({
      ...task,
      deadline: moment(task.deadline),
    }); // Prefill form with task data
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddOrEditTask = async (values: any) => {
    setLoading(true);
    try {
      const payload: any = {};
      if (values.title !== editTask?.title) payload.title = values.title;
      if (values.description !== editTask?.description)
        payload.description = values.description;
      if (values.assignedTo !== editTask?.assignedTo)
        payload.assignedTo = values.assignedTo;
      if (values.deadline !== editTask?.deadline)
        payload.deadline = values.deadline;

      if (editTask) {
        const res: any = await dispatch(UpdateTask(payload, editTask?._id));
        if (res.status === 200) {
          dispatch(GetAllTask({ status: "" }));
        }
      } else {
        // Create new task
        const res: any = await dispatch(createTask(payload));
        if (res?.status === 201) {
          dispatch(GetAllTask({ status: "" }));
        }
      }
    } catch (err) {
      console.error("Error adding/editing task:", err);
    } finally {
      hideModal();
      setLoading(false);
    }
  };

  const handleDeleteTask = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this task?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await dispatch(DeleteTask(id));
          if (res?.status === 200) {
            dispatch(GetAllTask({ status: "" }));
          }
        } catch (err) {
          console.error("Error deleting task:", err);
        }
      },
      onCancel: () => {
        console.log("Delete cancelled");
      },
    });
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    console.log("taskId", taskId);
    console.log("newStatus", newStatus);
    try {
      // Update the status locally
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, status: newStatus } : task
      );
      setTasks(updatedTasks);

      // Optional: Dispatch an action to update status in the backend
      let res = await dispatch(UpdateTaskStatus({ status: newStatus }, taskId));
      if (res?.status === 200) {
        dispatch(GetAllTask({ status: "" }));
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
    },
    {
      title: "Deadline",
      dataIndex: "deadline",
      key: "deadline",
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: any) => (
        <Select
          placeholder="Select status"
          value={record.status} // Set the current status value
          onChange={(value) => handleStatusChange(record._id, value)} // Handle status change
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="In Progress">In Progress</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Task) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            size="small"
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTask(record._id)}
            size="small"
            danger
          />
        </Space>
      ),
    },
  ];

  const handleSelectChange = (value: any) => {
    setSelectedOption(value); // Update the state with the selected value
  };

  useEffect(() => {
    dispatch(GetAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedOption === "all") {
      dispatch(GetAllTask({ status: "" })); // No status, so do not pass any value
    } else if (selectedOption === "my") {
      dispatch(GetAllTask({ status: "my" })); // Pass 'my' as the status
    }
  }, [dispatch, selectedOption]);

  useEffect(() => {
    if (allTask?.data) {
      const transformedTasks = allTask.data.map((task: any) => ({
        _id: task._id,
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo?.username || "Unassigned",
        deadline: moment(task.deadline).format("YYYY-MM-DD"),
        status: task.status,
      }));
      setTasks(transformedTasks);
    }
  }, [allTask]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-7 mt-2">
        <Select
          className="w-28"
          placeholder="Select..."
          value={selectedOption} // Bind the state to the Select component
          onChange={handleSelectChange}
        >
          <Select.Option value={"all"}>All</Select.Option>
          <Select.Option value={"my"}>My</Select.Option>
        </Select>
        <Button type="primary" onClick={showAddModal}>
          Add Task
          {/* {TaskList()} */}
        </Button>
      </div>
      <Table columns={columns} dataSource={tasks} rowKey="_id" />

      {/* Add/Edit Task Modal */}
      <Modal
        title={editTask ? "Edit Task" : "Add Task"}
        visible={isModalVisible}
        onCancel={hideModal}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddOrEditTask}
          initialValues={{
            title: "",
            description: "",
            assignedTo: "",
            deadline: dayjs(),
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Assigned To"
            name="assignedTo"
            rules={[{ required: true, message: "Please select the assignee!" }]}
          >
            <Select placeholder="Select assignee">
              {allUser?.data?.map((user: any) => (
                <Select.Option key={user._id} value={user._id}>
                  {user.username}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Deadline"
            name="deadline"
            rules={[{ required: true, message: "Please select the deadline!" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              {editTask ? "Edit Task" : "Add Task"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskPage;
