import { Route, Routes } from "react-router";
import App from "./App";
import { Landing } from "./pages/Landing";
import { AssessmentIntro } from "./pages/AssessmentIntro";

export const Router = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Landing />} />
        <Route path="intro" element={<AssessmentIntro />} />
      </Route>
    </Routes>
  );
};
