// import { useState } from "react";
import ModeToggle from "./mode-toggle";
import DialogComponent from "./DialogComponent";

function Header() {
  // const [dialogContent, setDialogContent] = useState("");

  return (
    <div className="relative flex justify-between border-b-[1px] border-gray px-2 py-4">
      <ModeToggle />
      <h1 className="center font-Title text-3xl">WORDLE TR</h1>
      <div className="flex items-center gap-2">
        <DialogComponent icon="info" />
        <DialogComponent icon="settings" />
        <DialogComponent icon="stats" />
      </div>
    </div>
  );
}

export default Header;
