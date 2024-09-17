import { useState } from "react";
import { BottomWarning } from "../component/BottomWarning";
import { Button } from "../component/Button";
import { Heading } from "../component/Heading";
import { InputBox } from "../component/InputBox";
import { SubHeading } from "../component/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // State for managing error message
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!username || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in error:", error);
      setError("Sign in failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign in" />
          <SubHeading label="Enter your credentials to access your account" />
          {error && (
            <div className="mb-4 text-red-500 font-semibold">
              {error}
            </div>
          )}
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="example@gmail.com"
            label="Email"
            value={username}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
            label="Password"
            type="password"
            value={password}
          />
          <div className="pt-4">
            <Button onClick={handleSignIn} label="Sign in" />
          </div>
          <BottomWarning
            label="Don't have an account?"
            buttonText="Sign up"
            to="/signup"
          />
        </div>
      </div>
    </div>
  );
};