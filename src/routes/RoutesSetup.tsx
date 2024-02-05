import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import SchedulePosting from "./SchedulePage";
import ScheduleList from "./ScheduleListPage";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import MainPage from "./MainPage";
import MyInformationPage from "./MyInformationPage";
import ListPage from "./ListPage";
import PlanningPage from "./PlanningPage";
import MyProfilePage from "./MyProfilePage";
import UserProfilePage from "./UserProfilePage";
import NoMatch from "./NoMatch";
import TourPage from "./TourPage";
import SignInPageFind from "./SignInPageFind";
import UnAuthorized from "./UnAuthorized";
import PrivateRoute from "./AuthRoute/PrivateRoute";

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
      <Route path="/SignInPageFind" element={<Layout />}>
        <Route index element={<SignInPageFind />} />
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
      <Route path="/SchedulePage/:sno" element={<Layout />}>
        <Route index element={<SchedulePosting />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route
        path="/PlanningPage"
        element={
          <PrivateRoute element={<Layout />}>
            <Route index element={<PlanningPage />} />
            <Route path="*" element={<NoMatch />} />
          </PrivateRoute>
        }
      />
      <Route
        path="/MyProfilePage"
        element={
          <PrivateRoute element={<Layout />}>
            <Route index element={<MyProfilePage />} />
            <Route path="*" element={<NoMatch />} />
          </PrivateRoute>
        }
      />
      <Route
        path="/MyInformationPage"
        element={
          <PrivateRoute element={<Layout />}>
            <Route index element={<MyInformationPage />} />
            <Route path="*" element={<NoMatch />} />
          </PrivateRoute>
        }
      />
      <Route path="/UserProfilePage" element={<Layout />}>
        <Route index element={<UserProfilePage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/TourPage/*" element={<TourPage />}></Route>
      <Route path="/ScheduleListPage" element={<Layout />}>
        <Route index element={<ScheduleList />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
      <Route path="/UnAuthorized" element={<Layout />}>
        <Route index element={<UnAuthorized />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
