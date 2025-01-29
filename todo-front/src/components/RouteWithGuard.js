import React from 'react';
import { Route } from 'react-router-dom';
import PublicRoute from '../routes/PublicRoute';
import ProtectedRoute from '../routes/ProtectedRoute';


const RouteWithGuard = ({ element, protectedRoute, ...props }) => {
    const RouteWrapper = protectedRoute ? ProtectedRoute : PublicRoute;
    console.log("RouteWrapper:: ",RouteWrapper)
    return (
      <Route
        {...props}
        element={
          <RouteWrapper>
            {element}
          </RouteWrapper>
        }
      />
    );
  };
  
  export default RouteWithGuard;