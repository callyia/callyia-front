import type { FC } from "react";
import React, { useEffect } from "react";
import "./PlaceCard.css";

export type IPlaceCardProps = {
  lat: number;
  lng: number;
  name: string;
};

export type PlaceCardProps = {
  placeCard: IPlaceCardProps;
  onClick: (lat: number, lng: number) => void;
};

const PlaceCard: React.FC<PlaceCardProps> = ({ placeCard, onClick }) => {
  const { lat, lng, name } = placeCard;

  const MapClick = () => {
    onClick(lat, lng);
  };

  return (
    <div className="placeCard-div" onClick={MapClick}>
      <img
        src="https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2F2040259719a82596f3517fc8313dc47071d76b6c%3Foriginal"
        alt="place_img"
        className="place-image"
      />
      {lat},{lng},{name}
    </div>
  );
};

export default PlaceCard;
