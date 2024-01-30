import type { FC } from "react";
import React, { useEffect, useState } from "react";
import "./Plan.css";

export type IPlanProps = {
  placeId: number;
  placeName: string;
  address: string;
  image: string;
  latitude: number;
  longitude: number;
  placeContent: string;
};

export type PlanProps = {
  plan: IPlanProps;
  onClick: (latitude: number, longitude: number) => void;
};

const Plan: React.FC<PlanProps> = ({ plan, onClick }) => {
  const {
    placeId,
    placeName,
    address,
    image,
    latitude,
    longitude,
    placeContent,
  } = plan;

  const MapClick = () => {
    console.log("MAPCLICK");
    console.log(placeName);
    onClick(latitude, longitude);
  };

  return (
    <div className="plan-div" onClick={MapClick}>
      <div className="plan-image-container">
        <img className="plan-image" src={image} alt="place_img" />
      </div>
      <div className="plan-text-container">
        <div className="plan-title-container">
          <span className="plan-title-span plan-text">{placeName}</span>
        </div>
        <div className="plan-content-container">
          <span className="plan-content-span plan-text">{placeContent}</span>
        </div>
      </div>
      {/* <div className="right-container">
        <div className="right-div-title">
          <div className="w-full h-6"></div>
          <span className="text-lg plan-text">{placeName}</span>
        </div>
        <div className="right-div-detail">
          <span className="plan-text">{placeContent}</span>
        </div>
      </div> */}
    </div>
  );
};

export default Plan;
