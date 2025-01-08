/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { lazy, useEffect } from "react";
import { useLocation, useRoutes, Navigate } from "react-router-dom";
import { SuspenseElement as Suspense } from "../utils/index";
import { useSelector } from "react-redux";

const Menu = lazy(() => import("./auth/auth"));
const Login = lazy(() => import("./auth/login/Login"));
const Register = lazy(() => import("./auth/register/Register"));
const Home = lazy(() => import("./home/Home"));
const Header = lazy(() => import("../components/header/Header"));
const Private = lazy(() => import("./private/index"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Cars = lazy(() => import("./dashboard/cars/Cars"));
const Profile = lazy(() => import("./dashboard/profile/Profile"));
const Categories = lazy(() => import("./categories/Categories"));
const CreateCar = lazy(() =>
  import("../components/create-modal/CreateComponent")
);
const CarDetails = lazy(() => import("./car-details/CarDetails"));
const Verify = lazy(() => import("./verify/Verify"));
const Users = lazy(() => import("./dashboard/users/Users"));
const Update = lazy(() => import("../components/create-modal/CreateComponent"));
const Empty = lazy(() => import("./found/notFound"));
const Category = lazy(() => import("./dashboard/category/Category"));
const Reimburse = lazy(() => import("./dashboard/reimburse/Reimburse"));
const Search = lazy(() => import("./search/Search"));
const Orders = lazy(() => import("./orders/Orders"))
const RoutesController = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return useRoutes([
    {
      element: <Header />,
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "dashboard",
          element: (
            <Suspense>
              <Private />
            </Suspense>
          ),
          children: [
            {
              path: "",
              element: (
                <Suspense>
                  <Dashboard />
                </Suspense>
              ),
              children: [
                {
                  path: "cars",
                  element:
                    user?.role === "admin" ? (
                      <Suspense>
                        <Cars />
                      </Suspense>
                    ) : (
                      <Navigate to="/dashboard" />
                    ),
                },
                {
                  path: "category",
                  element:
                    user?.role === "admin" ? (
                      <Suspense>
                        <Category />
                      </Suspense>
                    ) : (
                      <Navigate to="/dashboard" />
                    ),
                },
                {
                  path: "users",
                  element:
                    user?.role === "admin" ? (
                      <Suspense>
                        <Users />
                      </Suspense>
                    ) : (
                      <Navigate to="/dashboard" />
                    ),
                },
                {
                  path: "profile",
                  element: (
                    <Suspense>
                      <Profile />
                    </Suspense>
                  ),
                },
                {
                  path: "reimburse",
                  element: (
                    <Suspense>
                      <Reimburse />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "categories",
          element: (
            <Suspense>
              <Categories />
            </Suspense>
          ),
        },
        {
          path: "create-car",
          element: (
            <Suspense>
              <CreateCar />
            </Suspense>
          ),
        },
        {
          path: "edit/",
          element: (
            <Suspense>
              <Update />
            </Suspense>
          ),
        },
        {
          path: "details/:id",
          element: (
            <Suspense>
              <CarDetails />
            </Suspense>
          ),
        },
        {
          path: "orders",
          element: (
            <Suspense> <Orders/> </Suspense>
          )
        },
        {
          path: "search",
          element: (
            <Suspense>
              <Search />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "auth",
      element: (
        <Suspense>
          <Menu />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense>
              <Register />
            </Suspense>
          ),
        },
        {
          path: "verify/",
          element: (
            <Suspense>
              <Verify />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense>
          <Empty />
        </Suspense>
      ),
    },
  ]);
};

export default RoutesController;
