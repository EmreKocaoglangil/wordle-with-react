/* eslint-disable no-undef */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Icon from "./ui/Icon";

interface DialogProps {
  icon: "settings" | "info" | "stats";
}

function DialogComponent({ icon }: DialogProps) {
  // 108 115 61
  // #538d4e
  // #6aaa64
  return (
    <Dialog>
      <DialogTrigger>
        <Icon
          className="cursor-pointer fill-primary-foreground"
          width="30"
          height="30"
          icon={icon}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription>{icon} desc</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default DialogComponent;
