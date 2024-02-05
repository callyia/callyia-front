import type { FC } from "react";
import React, { useEffect } from "react";
import "./PlaceCard.css";
import { IoAddCircle } from "react-icons/io5";

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
      <div className="place-image-contaier">
        <img src={image} alt="place_img" className="place-image" />
      </div>
      <div className="place-text-container">
        <div className="place-title-container">
          <span className="place-title-span placeCard-text">{placeName}</span>
        </div>
        {/* <div className="pline-contaier">
          <div className="pline"></div>
        </div> */}
        <div className="place-content-container">
          <span className="place-content-span placeCard-text">
            {placeContent}
          </span>
        </div>
      </div>
      <div className="place-btn-div">
        <button type="button" className="plus-btn" onClick={BtnClick}>
          <IoAddCircle className="add-btn" />
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
