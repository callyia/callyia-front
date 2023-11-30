import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import SchedulePage from "./SchedulePage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import MainPage from "./MainPage";
import ListPage from "./ListPage";
import PlanningPage from "./PlanningPage";
import MyProfilePage from "./MyProfilePage";
import UserProfilePage from "./UserProfilePage";
import NoMatch from "./NoMatch";

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/SignInPage" element={<Layout />}>
        <Route index element={<SignInPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/SignUpPage" element={<Layout />}>
        <Route index element={<SignUpPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/ListPage" element={<Layout />}>
        <Route index element={<ListPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/SchedulePage" element={<Layout />}>
        <Route index element={<SchedulePage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/PlanningPage" element={<Layout />}>
        <Route index element={<PlanningPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/MyProfilePage" element={<Layout />}>
        <Route index element={<MyProfilePage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/UserProfilePage" element={<Layout />}>
        <Route index element={<UserProfilePage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}