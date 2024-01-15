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
      <img className="plan-image" src={image}></img>
      <div className="right-container">
        <div className="right-div-title">
          <div className="w-full h-6"></div>
          <span className="text-lg plan-text">{placeName}</span>
        </div>
        <div className="right-div-detail">
          <span className="plan-text">{placeContent}</span>
        </div>
      </div>
    </div>
  );
};

export default Plan;
