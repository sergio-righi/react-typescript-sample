import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultLayout, EmptyLayout } from "layouts";
import { Error } from "components";
import { Home } from "pages";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="*" element={<EmptyLayout />}>
          <Route index element={<Error.Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
