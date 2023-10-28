import { memo } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { BasePath, WebPath } from "../common/config";
import Test from "./content/digit_recognition/digit_recognition";

// interface MainRouterProps {
// }

const routes = [
  {
    path: `${BasePath}${WebPath.DigitRecognition}`,
    render: Test,
  },
];
const MainRouter = memo(() => {
  return (
    <Routes>
      {routes.map((data, index) =>
        <Route key={`${data.path}_${index}`} path={data.path} element={<data.render />} />
      )}
      <Route path='*' element={<Navigate to={`${BasePath}${WebPath.DigitRecognition}`} />} />
    </Routes>
  );
 
});

MainRouter.displayName = "MainRouter";

export default MainRouter;
