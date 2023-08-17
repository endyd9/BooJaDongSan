"use client";

import { useEffect } from "react";

export default function KakaoMap(props: any) {
  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        //지도 div
        const mapContainer = document.getElementById("map");

        //지도 옵션
        const mapOption = {
          center: new window.kakao.maps.LatLng(props.coords.y, props.coords.x),
          level: 3,
        };

        //지도 생성
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 마커 설정
        const markerPosition = new window.kakao.maps.LatLng(
          props.coords.y,
          props.coords.x
        );

        //지도 확대 축소 컨트롤러
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        //마커 생성
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        //마커 그리기
        marker.setMap(map);
      });
    }
  }, []);
  return (
    <div id="map" className="w-full h-60 mb-10">
      로딩중...
    </div>
  );
}
