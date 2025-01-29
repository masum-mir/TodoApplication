import React from "react";
import { Routes, Route } from "react-router-dom";
import TodoList from "../pages/TodoList";
import Login from "../pages/Login";
import Home, { Dashboard } from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import { ModalProvider } from "../context/ModalContext";

import RouteWithGuard from "../components/RouteWithGuard";
import { ROUTES } from "./routes";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layouts/Layout";
import ContentList from "../pages/ContentList";

const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Login />} /> */}
      <Route
        path={ROUTES.PUBLIC.LOGIN}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      {/* <Route
        path={ROUTES.PUBLIC.REGISTER}
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
  */}

      {/* <Route
        path={ROUTES.PRIVATE.TODO_LIST}
        element={
          <ProtectedRoute>
            <ModalProvider>
              <TodoList />
            </ModalProvider>
          </ProtectedRoute>
        }
      /> */}

      <Route
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
      >
        <Route path={ROUTES.PRIVATE.DASHBOARD} element={<Dashboard />} />
        {/* <Route path={ROUTES.PRIVATE.PROFILE} element={<Profile />} />
        <Route path={ROUTES.PRIVATE.SETTINGS} element={<Settings />} /> */}
        <Route path={ROUTES.PRIVATE.TODO_LIST} element={<ModalProvider><TodoList /></ModalProvider>} />
        <Route path={ROUTES.PRIVATE.CONTENT_LIST} element={<ContentList/>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

/**
 * const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const PageComponent = Pages[route.component]; // Dynamically load page
        if (route.isProtected) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectedRoute>
                  <PageComponent />
                </ProtectedRoute>
              }
            />
          );
        } else if (route.isPublic) {
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PublicRoute>
                  <PageComponent />
                </PublicRoute>
              }
            />
          );
        } else {
          return null;
        }
      })}
    </Routes>
  );
};

export default AppRoutes;
 */
