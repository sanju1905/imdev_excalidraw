import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useDevice, useExcalidrawAppState } from "../App";
import Island from "../Island";

const MenuTrigger = ({
  className = "",
  children,
  onToggle,
}: {
  className?: string;
  children: React.ReactNode;
  onToggle: () => void;
}) => {
  const appState = useExcalidrawAppState();
  const device = useDevice();
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    setIsCreator(!shouldHideForLinkUser());
  }, []);

  const shouldHideForLinkUser = () => {
    const urlParams = new URLSearchParams(window.location.hash.substr(1));
    const roomParam = urlParams.get("room");
    return roomParam !== null;
  };

  const classNames = clsx(
    "dropdown-menu-button",
    "zen-mode-transition",
    {
      "transition-left": appState.zenModeEnabled,
      "dropdown-menu-button--mobile": device.isMobile,
    },
    className,
    { "hidden-for-link": !isCreator }
  ).trim();

  const handleClick = () => {
    console.log("Button clicked!");
    onToggle(); // Ensure that onToggle is invoked
  };

  return (
    <Island>
      <button
        data-prevent-outside-click
        className={classNames}
        onClick={handleClick}
        type="button"
        data-testid="dropdown-menu-button"
      >
        {children}
      </button>
    </Island>
  );
};

export default MenuTrigger;
MenuTrigger.displayName = "DropdownMenuTrigger";
