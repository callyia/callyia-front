import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistPage from "./RegistPage";
import Layout from "../Layout";
import NoMatch from "../NoMatch";

export default function TourPage() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RegistPage checkColumnData="전체" />} />
        <Route
          path="Tourist"
          element={<RegistPage checkColumnData="관광지" />}
        />
        <Route path="Food" element={<RegistPage checkColumnData="음식점" />} />
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
