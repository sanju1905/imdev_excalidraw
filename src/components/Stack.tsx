// Stack.tsx

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import "./Stack.scss";
import { shouldHideForLinkUser } from "./Island"; // Import the function from Island.tsx

type StackProps = {
  children: React.ReactNode;
  gap?: number;
  align?: "start" | "center" | "end" | "baseline";
  justifyContent?: "center" | "space-around" | "space-between";
  className?: string | boolean;
  style?: React.CSSProperties;
};

const RowStack = ({
  children,
  gap,
  align,
  justifyContent,
  className,
  style,
}: StackProps) => {
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    setIsCreator(!shouldHideForLinkUser());
  }, []);

  return (
    <div
      className={clsx("Stack Stack_horizontal", className, { "--visible-for-creator": isCreator, "--hidden-for-creator": !isCreator })}
      style={{
        "--gap": gap,
        alignItems: align,
        justifyContent,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const ColStack = ({
  children,
  gap,
  align,
  justifyContent,
  className,
  style,
}: StackProps) => {
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    setIsCreator(!shouldHideForLinkUser());
  }, []);

  return (
    <div
      className={clsx("Stack Stack_vertical", className, { "--visible-for-creator": isCreator, "--hidden-for-creator": !isCreator })}
      style={{
        "--gap": gap,
        justifyItems: align,
        justifyContent,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default {
  Row: RowStack,
  Col: ColStack,
};
