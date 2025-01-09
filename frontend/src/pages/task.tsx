import React, { useState } from "react";
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
import { createTask } from "../redux/task/action";

interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: string;
  deadline: string;
}

const assignOption = [
  { value: "677f6c97b0dd2e1131ef2719", label: "John Doe1" },
  { value: "677f6c97b0dd2e1131ef2713", label: "John Doe2" },
  { value: "677f6c97b0dd2e1131ef2712", label: "John Doe3" },
];

const TaskPage: React.FC = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm(); // Form instance for Add/Edit Task

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
    console.log("values :>> ", values);
    setLoading(true);
    try {
      const payload = {
        title: values.title,
        description: values.description,
        assignedTo: values.assignedTo,
        deadline: values.deadline,
      };

      if (editTask) {
        // Update the task
        const updatedTask = { ...editTask, ...payload };
        const updatedTasks = tasks.map((task) =>
          task._id === editTask._id ? updatedTask : task
        );
        setTasks(updatedTasks);
      } else {
        // Create new task
        const res: any = await dispatch(createTask(payload));
        console.log("res :>> ", res);
        if (res?.status === 201) {
          console.log("res :>> ", res);
        }
        const newTask = { ...payload, _id: res.data._id }; // Assuming API returns _id
        setTasks([...tasks, newTask]);
      }
      hideModal();
    } catch (err) {
      console.error("Error adding/editing task:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = (_id: string) => {
    const updatedTasks = tasks.filter((task) => task._id !== _id);
    setTasks(updatedTasks);
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
        <Select placeholder="Select status">
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

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-bold">Task Page</h1>
        <Button type="primary" onClick={showAddModal}>
          Add Task
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
            deadline: moment(),
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
              {assignOption.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
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
