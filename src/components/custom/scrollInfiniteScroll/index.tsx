import { useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import "./index.css";
import "overlayscrollbars/overlayscrollbars.css";
import React, { useEffect, useRef } from "react";
import UserPrice from "@/components/ui/userPrice";
import InfiniteScrollContent from "@/components/custom/infiniteScrollContent";

import { InfiniteScroll } from "antd-mobile";
interface ScrollProps {
  children?: React.ReactNode;
  distanceClientHeight?: string;
  hasMore: boolean;
  onLoadMore: (isRetry: boolean) => Promise<void>;
}
const InfinietScrollbar: React.FC<ScrollProps> = ({
  children,
  hasMore,
  distanceClientHeight,
  onLoadMore,
}) => {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          theme: "custom-theme",
        },
      }}
    >
      <div
        style={
          {
            // height: distanceClientHeight ? distanceClientHeight : "auto",
          }
        }
      >
        {children}
        <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore}>
          <InfiniteScrollContent></InfiniteScrollContent>
        </InfiniteScroll>
      </div>
    </OverlayScrollbarsComponent>
  );
};
export default InfinietScrollbar;
