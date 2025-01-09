import { useState } from "react";
import { Form, Input, Button } from "antd";
import { login } from "../redux/user/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generatePopup } from "../utility/popup";

const LoginRegister = ({ setIsLoggedIn }: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFinish = async (values: any) => {
    setLoading(true);

    try {
      const res = await dispatch(login(values));
      if (res?.status === 200) {
        localStorage.setItem("token", res?.data?.token);
        form.resetFields();
        generatePopup("success", res?.message);
        setIsLoggedIn(true);
        navigate("/task");
      }
    } catch (err) {
      console.log("err :>> ", err);
      generatePopup("error", res?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your Username or Email!",
              },
              {
                type: "email",
                message: "Enter a valid Username or Email address!",
              },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Button
            loading={loading}
            disabled={loading}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginRegister;
