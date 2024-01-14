import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentRef,
  useOverlayScrollbars,
} from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import "./index.css";
import "overlayscrollbars/overlayscrollbars.css";
import React, { useEffect, useRef } from "react";
import { OverlayScrollbars } from "overlayscrollbars";

interface ScrollProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  distanceClientHeight: number;
  onloadMore?: () => void;
}
const CustomScrollbar: React.FC<ScrollProps> = ({
  children,
  className,
  style,
  distanceClientHeight,
  onloadMore,
}) => {
  console.log(distanceClientHeight);
  const osRef = useRef<OverlayScrollbarsComponentRef>(null);
  const currentRef = osRef?.current;

  const activateEvent = (eventName: OverlayScrollbars) => {
    const scrollTop = eventName.elements().content;

    console.log("scrollTop", scrollTop.scrollTop);
    if (scrollTop.scrollTop >= distanceClientHeight) {
      onloadMore && onloadMore();
    }
  };
  return (
    <OverlayScrollbarsComponent
      ref={osRef}
      options={{
        scrollbars: {
          theme: "custom-theme",
        },
      }}
      events={{
        scroll: (val) => activateEvent(val),
      }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};
export default CustomScrollbar;
