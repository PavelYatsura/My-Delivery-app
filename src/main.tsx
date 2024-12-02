import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";
import { Cart } from "./pages/Cart/Cart";
import { Error } from "./pages/Error/Error";
import { Layout } from "./Layout/Layout/Layout";
import { Products } from "./pages/Product/Product";
import axios from "axios";
import { PREFIX } from "./helpers/API";
import { AuthLayout } from "./Layout/Auth/AuthLayout";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { RequireAuth } from "./helpers/RequireAuth";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Succes } from "./pages/Succes/Succes";

export const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <RequireAuth>
          <Layout />
        </RequireAuth>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<h2>Загрузка...</h2>}>
              <Menu></Menu>
            </Suspense>
          ),
        },
        {
          path: "/success",
          element: <Succes></Succes>,
        },
        {
          path: "/cart",
          element: <Cart></Cart>,
        },
        {
          path: "/product/:id",
          element: <Products></Products>,
          errorElement: <>Ошибка</>,
          loader: async ({ params }) => {
            return defer({
              data: new Promise((resolve, reject) => {
                setTimeout(() => {
                  axios
                    .get(`${PREFIX}/products/${params.id}`)
                    .then((data) => resolve(data))
                    .catch((e) => reject(e));
                }, 2000);
              }),
            });

            // return defer({
            //   data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
            // })
            // await new Promise<void>((resolve) => {
            //   setTimeout(() => {
            //     resolve();
            //   }, 2000);
            // });
            // const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
            // return data;
          },
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout></AuthLayout>,
      children: [
        {
          path: "login",
          element: <Login></Login>,
        },
        {
          path: "register",
          element: <Register></Register>,
        },
      ],
    },
    {
      path: "*",
      element: <Error></Error>,
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider future={{ v7_startTransition: true }} router={router} />
    </Provider>
  </StrictMode>
);
