import { useState } from "react";
import { Form, Input, Button } from "antd";
import { login } from "../redux/user/actions"; // Assume register action is implemented
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generatePopup } from "../utility/popup";

const LoginRegister = ({ setIsLoggedIn }: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true); // Toggle between Login and Register
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      if (isLoginMode) {
        // Handle Login
        const res: any = await dispatch(login(values));
        if (res?.status === 200) {
          localStorage.setItem("token", res?.data?.token);
          form.resetFields();
          generatePopup("success", res?.message);
          setIsLoggedIn(true);
          navigate("/task");
        }
      } else {
        // Handle Register
        // const res = await dispatch(register(values));
        const res: any = "";
        if (res?.status === 201) {
          generatePopup("success", "Registration successful! Please log in.");
          form.resetFields();
          setIsLoginMode(true); // Switch to login form
        }
      }
    } catch (err) {
      console.error("Error:", err);
      generatePopup(
        "error",
        err?.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          {isLoginMode ? "Login" : "Register"}
        </h1>
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              {
                min: 6,
                message: "Password must be at least 6 characters long!",
              },
            ]}
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
            {isLoginMode ? "Login" : "Register"}
          </Button>
        </Form>
        <div className="mt-4 text-center">
          {isLoginMode ? (
            <div className="flex items-center justify-center gap-1">
              <span>Don't have an account? </span>
              <p
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setIsLoginMode(false)}
              >
                Register
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              <span>Already have an account? </span>
              <p
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setIsLoginMode(true)}
              >
                Login
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
