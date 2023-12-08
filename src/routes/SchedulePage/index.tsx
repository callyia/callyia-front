//index.tsx
import React, { useEffect } from "react";
import Schedule from "./Schedule";
import Mymap from "./Mymap";
import Cart from "./Cart";

export default function SchedulePage() {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderRight: "2px solid #abcdef",
          padding: "16px",
          margin: "8px",
        }}
      >
        <div style={{ flex: 1 }}>
          {/* 왼쪽 상단 */}
          <Schedule />
        </div>
        <div style={{ flex: 1 }}>{/* 왼쪽 하단 */}</div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            flex: 2,
            borderBottom: "2px solid #abcdef",
            padding: "16px",
            margin: "8px",
          }}
        >
          {/* 오른쪽 상단 */}
          <Mymap />
        </div>
        <div
          style={{
            flex: 1,
            borderTop: "2px solid #abcdef",
            padding: "16px",
            margin: "8px",
          }}
        >
          {/* 오른쪽 하단 (장바구니 영역 추가) */}
          <Cart />
        </div>
      </div>
    </div>
  );
}
