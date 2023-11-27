// Mymap.tsx
import React, { useEffect } from "react";

declare global {
  interface Window {
    Tmapv3: any;
  }
}

const Mymap: React.FC = () => {
  useEffect(() => {
    const initTmap = () => {
      const map = new window.Tmapv3.Map("map_div", {
        center: new window.Tmapv3.LatLng(35.14299044, 129.03409987),
        width: "890px",
        height: "400px",
        zoom: 18,
      });
    };

    if (window.Tmapv3) {
      // Tmapv3 라이브러리가 이미 로드되어 있으면 초기화
      initTmap();
    } else {
      // Tmapv3 라이브러리를 동적으로 로드합니다.
      const script = document.createElement("script");
      script.src =
        "https://apis.openapi.sk.com/tmap/vectorjs?version=1&appKey=fAVBnOntPm1FUqkPuKQZc31F0pFE3KM41N1UeDkA";
      script.async = true;
      script.onload = () => {
        initTmap();
      };

      document.head.appendChild(script);
    }
  }, []);

  return <div id="map_div"></div>;
};

export default Mymap;
