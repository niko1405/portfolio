import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import App from './App';
import { HomePage } from './components/pages/HomePage';
import { ProjectPage } from './components/pages/ProjectPage';
import { AboutPage } from './components/pages/AboutPage';
import { ProjectDetailPage } from './components/pages/ProjectDetailPage';
import MainApp from './components/MainApp';
import { IntroPage } from './components/pages/IntroPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        path: "/intro",
        index: true, 
        element: <IntroPage /> },
      {
        path: "/",
        element: <MainApp />,
        children: [
          { index: true, element: <HomePage /> },

          {
            path: "home",
            element: <HomePage />
          },
          {
            path: "projects",
            element: <ProjectPage />
          },
          {
            path: "about",
            element: <AboutPage />
          },
          {
            path: "projects/:id",
            element: <ProjectDetailPage />
          },
        ]
      },
    ]
  },
]);

const root: any = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);