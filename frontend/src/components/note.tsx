import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { EditNote } from "@/components/editNote";
import { useCallData } from "@/pages/mainPage";
import axios from "axios";
import { useState } from "react";

export function Note() {
  const notes = useCallData();
  const [showBtn, setShowBtn] = useState(Array(notes.length).fill(false));

  const token = localStorage.getItem("token");

  return (
    <div className="w-full bg-slate-300 h-screen overflow-scroll grid grid-cols-3 gap-5 p-10 mt-14 rounded-md shadow-2xl mr-10">
      {notes.map((note, key) => {
        return (
          <ResizablePanelGroup
            key={key}
            direction="vertical"
            className="min-h-[200px] max-h-[300px] max-w-2xl rounded-lg border bg-gray-900 shadow-2xl text-white"
            onClick={() => {
              const tempArr = [...showBtn];
              tempArr[key] = !tempArr[key];
              setShowBtn(tempArr);
            }}
          >
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">{note.heading}</span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex h-full   p-6">
                <span className="overflow-scroll">{note.description}</span>
              </div>
            </ResizablePanel>
            <div
              className={
                "flex flex-row gap-6 justify-end mr-6 mb-4 " +
                (showBtn[key] ? "" : "hidden")
              }
            >
              <button
                className=" text-gray-400 hover:text-pink-700 transition-all active:text-pink-600"
                onClick={() => {
                  axios
                    .delete(
                      `http://localhost:3000/notesapp/notes/delete?key=${key}`,
                      {
                        headers: {
                          Authorization: token,
                        },
                      }
                    )
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                delete
              </button>
              <EditNote id={key} showBtn={showBtn} />
            </div>
          </ResizablePanelGroup>
        );
      })}
    </div>
  );
}
