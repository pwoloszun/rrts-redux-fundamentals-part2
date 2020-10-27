import React from 'react';

// redux
import ReduxFundamentals from '../../../../features/21-redux-fundamentals';
import ReduxAsync from '../../../../features/22-redux-async';
import ReduxTodosNormalized from '../../../../features/24-redux-todos-normalized';
import ReduxMiddleware from '../../../../features/25-redux-middleware';

const reduxRoutes = [
  {
    path: '/redux-fundamentals',
    label: 'Redux Fundamentals',
    main: () => <ReduxFundamentals />
  },
  {
    path: '/redux-async',
    label: 'Redux Async',
    main: () => <ReduxAsync />
  },
  {
    path: '/redux-todos-normalized',
    label: 'Redux Todos Normalized',
    main: () => <ReduxTodosNormalized />
  },
  {
    path: '/redux-middleware',
    label: 'Redux Middleware',
    main: () => <ReduxMiddleware />
  },
];

export default reduxRoutes;
