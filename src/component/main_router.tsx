import { memo } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Empty from "./empty";

// interface MainRouterProps {
// }

const routes = [
  {
    path: process.env.VITE_BASE_PATH,
    render: Empty,
  },
];
const MainRouter = memo(() => {
  
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((data, index) =>
          <Route key={`${data.path}_${index}`} path={data.path} element={<data.render />} />
        )}
      </Routes>
    </BrowserRouter>
  );
 
});

MainRouter.displayName = "MainRouter";

export default MainRouter;
