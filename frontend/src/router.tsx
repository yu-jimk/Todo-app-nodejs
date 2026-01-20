import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';

import ErrorPage from './shared/pages/ErrorPage';
import NotFoundPage from './shared/pages/NotFoundPage';
import TodoPage from './features/todo/pages/TodoPage';
import TodoDetailPage from './features/todo/pages/TodoDetailPage';
import TodoCreatePage from './features/todo/pages/TodoCreatePage';
import TodoEditPage from './features/todo/pages/TodoEditPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: TodoPage },
      { path: 'todos/:id', Component: TodoDetailPage },
      { path: 'todos/new', Component: TodoCreatePage },
      { path: 'todos/:id/edit', Component: TodoEditPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
