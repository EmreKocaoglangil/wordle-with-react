import ModeToggle from "./mode-toggle";
import Icon from "./ui/Icon";

function Header() {
  return (
    <div className="flex justify-between border-2 border-gray px-2 py-4">
      <ModeToggle />
      <h1 className="font-Title text-2xl">WORDLE TR</h1>
      <div className="flex items-center gap-2">
        <Icon
          className="cursor-pointer fill-primary-foreground"
          width="30"
          height="30"
          icon="settings"
        />
        <Icon
          className="cursor-pointer fill-primary-foreground"
          width="30"
          height="30"
          icon="stats"
        />
        <Icon
          className="cursor-pointer fill-primary-foreground"
          width="30"
          height="30"
          icon="info"
        />
      </div>
    </div>
  );
}

export default Header;
