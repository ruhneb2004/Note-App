import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";

export function TextareaWithButton({ setDescription, description, heading }) {
  const token = localStorage.getItem("token");
  return (
    <div className="grid w-full gap-2 ">
      <Textarea
        placeholder="Describe your task"
        className="text-slate-100 placeholder:text-slate-500 h-80"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <Button
        className="h-14 w-1/2 mx-auto bg-blue-800 font-semibold active:bg-blue-950 hover:bg-blue-900 transition-all min-w-[120px]"
        onClick={async () => {
          axios
            .post(
              "http://localhost:3000/notesapp/notes/create",
              {
                heading,
                description,
              },
              {
                headers: {
                  Authorization: token,
                },
              }
            )
            .then((res: object) => {
              console.log(res);
            });
        }}
      >
        Send message
      </Button>
    </div>
  );
}
