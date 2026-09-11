import { Route, Routes } from "react-router";
import App from "./App";
import { Landing } from "./pages/Landing";

export const Router = () => {
  return (
    <Routes>
      <Route element={<App />}>
        <Route index element={<Landing />} />
      </Route>
    </Routes>
  );
};
