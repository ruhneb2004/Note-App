import { Textarea } from "@/components/ui/textarea";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { TextareaWithButton } from "@/components/textarea";

import { Note } from "@/components/note";

export const MainPage = () => {
  const navigate = useNavigate();
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="h-full static">
      <button
        className="absolute right-12 bg-red-600 hover:bg-red-700 active:bg-red-800 transition-colors font-semibold shadow-lg px-5 py-2 text-white rounded"
        onClick={() => {
          localStorage.removeItem("token");
          const token = localStorage.getItem("token");
          console.log(token);
          if (token) return console.log("logout failed");
          navigate("/signin");
        }}
      >
        Logout
      </button>

      <div
        className="mt-8 ml-16 h-20 text-5xl"
        style={{ fontFamily: "Pacifico" }}
      >
        ClipNotes
      </div>

      <div className="flex w-full h-full justify-between ">
        <div className="w-2/5">
          <div className="flex flex-col w-min-[400px] h-full items-center ">
            <div className="w-3/4 min-w-[400px] shadow-2xl rounded-md bg-slate-900 flex flex-col gap-7 px-8 pt-11 h-fit pb-7">
              <Textarea
                placeholder="What do you want to get done today"
                className="text-slate-100 placeholder:text-slate-500"
                onChange={(e) => {
                  setHeader(e.target.value);
                }}
              />
              <TextareaWithButton
                setDescription={setDescription}
                description={description}
                heading={header}
              />
            </div>
          </div>
        </div>

        <Note />
      </div>
    </div>
  );
};

export const useCallData = () => {
  const token = localStorage.getItem("token");
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/notesapp/notes/view",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setNotes(response.data.notes.note);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    // Call fetchData initially
    fetchData();

    // Set up interval to call fetchData every second
    const intervalId = setInterval(fetchData, 2000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [token]);
  return notes;
};
