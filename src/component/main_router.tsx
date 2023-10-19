import { memo } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { BasePath, WebPath } from "../common/config";
import Test from "./content/test";

// interface MainRouterProps {
// }

const routes = [
  {
    path: `${BasePath}${WebPath.Test}`,
    render: Test,
  },
];
const MainRouter = memo(() => {
  return (
    <Routes>
      {routes.map((data, index) =>
        <Route key={`${data.path}_${index}`} path={data.path} element={<data.render />} />
      )}
      <Route path='*' element={<Navigate to={`${BasePath}${WebPath.Test}`} />} />
    </Routes>
  );
 
});

MainRouter.displayName = "MainRouter";

export default MainRouter;
