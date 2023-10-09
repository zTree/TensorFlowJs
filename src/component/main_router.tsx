import { memo } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Empty from "./empty";

// interface MainRouterProps {
// }

const routes = [
  {
    path: 'tensorflow/', // 后端已经修改了邮箱邀请链接地址，这个的旧路由是为了兼容旧的链接，后续可以删除
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
