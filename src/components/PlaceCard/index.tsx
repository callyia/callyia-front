import type { FC } from "react";
import React, { useEffect } from "react";
import "./PlaceCard.css";

export type IPlaceCardProps = {
  placeId: number;
  placeName: string;
  address: string;
  image: string;
  latitude: number;
  longitude: number;
  placeContent: string;
};

export type PlaceCardProps = {
  index?: number;
  placeCard: IPlaceCardProps;
  onClick: (
    placeId: number,
    placeName: string,
    address: string,
    image: string,
    latitude: number,
    longitude: number,
    placeContent: string,
    isBtnClick: boolean
  ) => void;
};

const PlaceCard: React.FC<PlaceCardProps> = ({ placeCard, onClick }) => {
  const {
    placeId,
    placeName,
    address,
    image,
    latitude,
    longitude,
    placeContent,
  } = placeCard;

  const DivClick = () => {
    onClick(
      placeId,
      placeName,
      address,
      image,
      latitude,
      longitude,
      placeContent,
      false
    );
  };

  const BtnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick(
      placeId,
      placeName,
      address,
      image,
      latitude,
      longitude,
      placeContent,
      true
    );
  };

  return (
    <div className="placeCard-div" onClick={DivClick}>
      <img src={image} alt="place_img" className="place-image" />
      <div className="w-full h-2"></div>
      <div className="w-full h-8">
        <span className="ml-3 text-lg placeCard-text">{placeName}</span>
      </div>
      <div className="w-full h-10">
        <span className="ml-3 placeCard-text">{placeContent}</span>
        <button type="button" className="plus-btn" onClick={BtnClick}></button>
      </div>
    </div>
  );
};

export default PlaceCard;
