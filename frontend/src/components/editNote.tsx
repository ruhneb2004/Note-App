import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useState } from "react";

export function EditNote({ id, showBtn }) {
  const token = localStorage.getItem("token");
  const [heading, setHeading] = useState();
  const [description, setDescription] = useState();
  const [editedHeading, setEditedHeading] = useState();
  const [editedDescription, setEditedDescription] = useState();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={
            " bg-blue-700 px-4 rounded-md py-1 hover:bg-blue-600 transition-all active:bg-blue-700" +
            (showBtn[id] ? "" : "hidden")
          }
          onClick={() => {
            axios
              .get(
                `http://localhost:3000/notesapp/notes/indvidualNotes?key=${id}`,
                {
                  headers: { Authorization: token },
                }
              )
              .then(async (res) => {
                await setHeading(res.data.heading);
                await setEditedDescription(res.data.description);
                await setEditedHeading(res.data.heading);
                await setDescription(res.data.description);
              });
          }}
        >
          edit
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle
            className="outline-none"
            contentEditable={true}
            onInput={(e) => {
              setEditedHeading(e.target.textContent);
            }}
          >
            {heading}
          </AlertDialogTitle>
          <AlertDialogDescription
            contentEditable={true}
            className="outline-none"
            onInput={(e) => {
              setEditedDescription(e.target.textContent);
            }}
          >
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              console.log(editedHeading, editedDescription);
              axios
                .put(
                  `http://localhost:3000/notesapp/notes/edit?key=${id}`,
                  {
                    heading: editedHeading,
                    description: editedDescription,
                  },
                  {
                    headers: { Authorization: token },
                  }
                )
                .then((res) => {
                  console.log(res.data);
                });
            }}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
