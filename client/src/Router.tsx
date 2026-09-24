import { Route, Routes } from "react-router";
import App from "./App";
import { Landing } from "./pages/Landing";
import { AssessmentIntro } from "./pages/AssessmentIntro";
import { Assessment } from "./pages/Assessment";
import { Results } from "./pages/Results";

export const Router = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Landing />} />
        <Route path="assessment">
          <Route index element={<AssessmentIntro />} />
          <Route path="test" element={<Assessment />} />
        </Route>
        <Route path="results/:resultId" element={<Results />} />
      </Route>
    </Routes>
  );
};
