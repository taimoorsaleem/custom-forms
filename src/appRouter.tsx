import { FC } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { CreateForm } from './pages/createForm';
import { ValidateFormPage } from './pages/validateForm';

const routes = [
  {
    element: <CreateForm />,
    path: 'create',
  },
  {
    element: <ValidateFormPage />,
    path: 'validate',
  },
  {
    element: <CreateForm />,
    path: 'edit/:id',
  },
];

const AppRouter: FC<{}> = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          const { path, ...otherProps } = route;
          return (
            <Route
              key={path}
              path={path}
              {...otherProps}
            />
          );
        })}
        <Route path="*" element={<Navigate to="/create" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
