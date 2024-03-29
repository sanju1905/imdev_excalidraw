/* Island.tsx */

/* Island.tsx */

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import "./Island.scss"; // Import the SCSS file
type IslandProps = {
  children: React.ReactNode;
  padding?: number;
  className?: string | boolean;
  style?: object;
};
export const shouldHideForLinkUser = () => {
  const urlParams = new URLSearchParams(window.location.hash.substr(1));
  const roomParam = urlParams.get("room");
  return roomParam !== null;
};

const Island = React.forwardRef<HTMLDivElement, IslandProps>(
  ({ children, padding, className, style }, ref) => {
    const [isCreator, setIsCreator] = useState(false);

    useEffect(() => {
      setIsCreator(!shouldHideForLinkUser());
    }, []);

    return (
      <div
        className={clsx("Island", className, { "hidden-for-creator": !isCreator })}
        style={{ "--padding": padding, ...style }}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

export default Island;
