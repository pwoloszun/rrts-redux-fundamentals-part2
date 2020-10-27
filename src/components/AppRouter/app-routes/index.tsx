import React from 'react';

import reactRoutes from './sections/react-routes';
import reduxRoutes from './sections/redux-routes';

export interface RouteInfo {
  path: string;
  label: string;
  main: React.FC;
  exact?: boolean;
}

export interface AppRoutesMap {
  [title: string]: RouteInfo[];
}

const appRoutes: AppRoutesMap = {
  'React tasks': reactRoutes,
  'Redux tasks': reduxRoutes,
};

export default appRoutes;
