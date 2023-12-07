import type { FC } from "react";
import React, { useEffect, useState } from "react";
import "./Plan.css";

export type IPlanProps = {
  lat: number;
  lng: number;
  name: string;
};

export type PlanProps = {
  plan: IPlanProps;
  onClick: (lat: number, lng: number) => void;
};

const Plan: React.FC<PlanProps> = ({ plan, onClick }) => {
  const { lat, lng, name } = plan;

  const MapClick = () => {
    onClick(lat, lng);
  };

  return (
    <div className="plan-div" onClick={MapClick}>
      <img
        className="plan-image"
        src="./dummyimages/samplePlaceImage.jpg"
      ></img>
      <div className="right-container">
        <div className="right-div-title">
          <div className="w-full h-6"></div>
          <span className="text-lg plan-text">{name}</span>
        </div>
        <div className="right-div-detail">
          <span className="plan-text">간단한 설명</span>
        </div>
      </div>
    </div>
  );
};

export default Plan;
