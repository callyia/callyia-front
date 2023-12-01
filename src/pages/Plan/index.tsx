import type { FC } from "react";
import React, { useEffect } from "react";
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

  const XYClick = () => {
    onClick(lat, lng);
  };

  return (
    <div className="plan-div" onClick={XYClick}>
      <div className="div-gap"></div>
      <div className="plan-image"></div>
      {lat},{lng},{name}
    </div>
  );
};

export default Plan;
