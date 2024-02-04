import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { AlertDestructive } from "@/components/errorNotification";

export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  return (
    <div className=" h-screen h-ful w-fulll">
      <div className="flex h-screen justify-center items-center w-full bg-gray-800">
        {error == "" ? null : <AlertDestructive error={error} />}

        <div className=" bg-gray-950 h-1/2 min-h-[530px] min-w-[400px] w-1/3 max-w-[600px] shadow-inner shadow-gray-500   rounded-lg flex flex-col items-center gap-11">
          <div className="text-gray-200 text-3xl mt-11 ">Sign In</div>
          <div className="w-full flex justify-center"></div>
          <div className="w-full flex justify-center">
            <input
              type="text"
              className="w-3/4 h-14 rounded border-gray-700 border-2 bg-gray-950 text-gray-300 focus:border-gray-500 outline-none pl-4 "
              placeholder="Email"
              onChange={async (e) => {
                await setEmail(e.target.value);
                console.log(email);
              }}
            />
          </div>
          <div className="w-full flex justify-center">
            <input
              type="password"
              className="w-3/4 h-14 rounded border-gray-700 border-2 bg-gray-950 text-gray-300 focus:border-gray-500 outline-none pl-4 "
              placeholder="Password"
              onChange={async (e) => {
                await setPassword(e.target.value);
                console.log(password);
              }}
            />
          </div>
          <div>
            <button
              className="bg-white px-20 py-4 font-bold rounded-lg active:bg-slate-800 active:text-gray-200 transition-all"
              onClick={async () => {
                axios
                  .post("http://localhost:3000/notesapp/user/signin", {
                    email,
                    password,
                  })
                  .then(async (res) => {
                    const token = "Bearer " + res.data.token;
                    console.log("🚀 ~ .then ~ res:", res);
                    localStorage.setItem("token", token);
                    res.status === 200 ? navigate("/mainpage") : null;
                  })
                  .catch((err): void => {
                    setError(err.response.data.mess);
                    console.log(error);
                  });
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
