import "./App.css";
import NavigationBar from "@/Components/NavigationBar/NavigationBar";
import Footer from "@/Components/Footer/Footer";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import MainPage from "@/Pages/MainPage/MainPage";
import AboutPage from "@/Pages/AboutPage/AboutPage";
import BoardPage from "@/Pages/BoardPage/BoardPage";
import LeadershipPage from "@/Pages/LeadershipPage/LeadershipPage";
import ServicesPage from "@/Pages/ServicesPage/ServicesPage";
import ContactPage from "@/Pages/ContactPage/ContactPage";
import AdminLogin from "./Pages/Admin/AdminLogin";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminEditPost from "./Pages/Admin/AdminEditPost";
import AdminCreatePost from "./Pages/Admin/AdminCreatePost";
import AdminPosts from "./Pages/Admin/AdminPosts";
import AdminContacts from "./Pages/Admin/AdminContacts";
import AdminNavigationBar from "./Components/AdminNavigationBar/AdminNavigationBar";

function AuthRedirectRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/verify-token",
          {},
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        console.log("verifyToken: ", response);
      } catch (error) {
        console.log("토큰 인증 실패:", error);
        setIsAuthenticated(false);
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }
  console.log("isAuthenticated:", isAuthenticated);
  return isAuthenticated ? <Navigate to="/admin/posts" replace /> : <Outlet />;
}

function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/verify-token",
          {},
          { withCredentials: true }
        );
        setIsAuthenticated(response.data.isValid);
        setUser(response.data.user);
      } catch (error) {
        console.log("토큰 인증 실패:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? (
    <Outlet context={{ user }} />
  ) : (
    <Navigate to="/admin" replace />
  );
}

function Layout() {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <AdminNavigationBar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/leadership",
        element: <LeadershipPage />,
      },
      {
        path: "/board",
        element: <BoardPage />,
      },
      {
        path: "/our-services",
        element: <ServicesPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AuthRedirectRoute />,
    children: [{ index: true, element: <AdminLogin /> }],
  },
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "posts",
            element: <AdminPosts />,
          },
          {
            path: "create-post",
            element: <AdminCreatePost />,
          },
          {
            path: "edit-post:id",
            element: <AdminEditPost />,
          },
          {
            path: "contacts",
            element: <AdminContacts />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
