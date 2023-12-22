import type { FC } from "react";
import React, { useEffect } from "react";
import "./PlaceCard.css";

export type IPlaceCardProps = {
  id: number;
  lat: number;
  lng: number;
  name: string;
};

export type PlaceCardProps = {
  index?: number;
  placeCard: IPlaceCardProps;
  onClick: (
    id: number,
    lat: number,
    lng: number,
    name: string,
    isBtnClick: boolean
  ) => void;
};

const PlaceCard: React.FC<PlaceCardProps> = ({ placeCard, onClick }) => {
  const { id, lat, lng, name } = placeCard;

  const DivClick = () => {
    onClick(id, lat, lng, name, false);
  };

  const BtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick(id, lat, lng, name, true);
  };

  return (
    <div className="placeCard-div" onClick={DivClick}>
      <img
        src="https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocal%2FkakaomapPhoto%2Freview%2F2040259719a82596f3517fc8313dc47071d76b6c%3Foriginal"
        alt="place_img"
        className="place-image"
      />
      <div className="w-full h-4"></div>
      <div className="w-full h-10">
        <span className="ml-3 text-lg placeCard-text">{name}</span>
      </div>
      <div className="w-full h-10">
        <span className="ml-3 placeCard-text">간단한 설명</span>
        <button type="button" className="plus-btn" onClick={BtnClick}></button>
      </div>
    </div>
  );
};

export default PlaceCard;
