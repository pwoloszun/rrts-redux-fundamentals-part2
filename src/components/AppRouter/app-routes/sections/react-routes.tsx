import React from 'react';

import Dashboard from '../../../../features/00-dashboard';

const reactRoutes = [
  {
    path: "/",
    exact: true,
    label: 'Dashboard',
    main: () => <Dashboard />
  },
];

export default reactRoutes;
