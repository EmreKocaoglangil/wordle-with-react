import React from "react";

// then define an Icon component that references the
interface IIcon extends React.ComponentPropsWithoutRef<"svg"> {
  icon: string;
}

function Icon({ icon, ...props }: IIcon) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <svg {...props}>
      <use href={`assets/sprite.svg#${icon}`} />
    </svg>
  );
}

export default Icon;
