import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import { AuthContext } from "./utils/AuthContext";
import { signup, login, getUser } from "./utils/UsersAPI";
import LoggedInNavBar from "./components/navbar/LoggedInNavBar";
import LoggedOutNavBar from "./components/navbar/LoggedOutNavbar";
import Frontpage from "./pages/frontpage/Frontpage";
import AboutUs from "./pages/about-us/AboutUs";
import ContactUs from "./pages/contact-us/ContactUs";
import Authorization from "./pages/authorization/Authorization";
import ResetPassword from "./pages/reset-password/ResetPassword";
import News from "./pages/news/News";
import { NewsLoader } from "./pages/news/NewsLoader";
import NewsArticlePage from "./pages/news-article/NewsArticlePage";
import { NewsArticlePageLoader } from "./pages/news-article/NewsArticlePageLoader";
import Activities from "./pages/activities/Activities";
import { ActivitiesLoader } from "./pages/activities/ActivitiesLoader";
import Activity from "./pages/activity/Activity";
import { ActivityLoader } from "./pages/activity/ActivityLoader";
import Messages from "./pages/messages/Messages";
import Match from "./pages/match/Match";
import { MatchLoader } from "./pages/match/MatchLoader";
import Help from "./pages/help/Help";
import { HelpLoader } from "./pages/help/HelpLoader";
import UserProfile from "./pages/user-profile/UserProfile";
import { UserProfileLoader } from "./pages/user-profile/UserProfileLoader";
import EditProfile from "./pages/edit-profile/EditProfile";
import { EditProfileLoader } from "./pages/edit-profile/EditProfileLoader";
import FriendsPage from "./pages/friends/FriendsPage";
import Friends from "./pages/friends/Friends";
import { FriendsLoader } from "./pages/friends/FriendsLoader";
import FriendRequests from "./pages/friends/FriendRequests";
import { FriendRequestsLoader } from "./pages/friends/FriendRequestsLoader";
import Caretaker from "./pages/caretaker/Caretaker";
import { CaretakerLoader } from "./pages/caretaker/CaretakerLoader";
import NewArticle from "./pages/caretaker/new-article/NewArticle";
import PostedArticles from "./pages/caretaker/posted-articles/PostedArticles";
import { MyArticlesLoader } from "./pages/caretaker/posted-articles/PostedArticlesLoader";
import EditArticle from "./pages/caretaker/edit-article/EditArticle";
import { EditArticleLoader } from "./pages/caretaker/edit-article/EditArticleLoader";
import NewActivity from "./pages/caretaker/new-activity/NewActivity";
import CreatedActivities from "./pages/caretaker/created-activities/CreatedActivities";
import { CreatedActivitiesLoader } from "./pages/caretaker/created-activities/CreatedActivitiesLoader";
import EditActivity from "./pages/caretaker/edit-activity/EditActivity";
import { EditActivityLoader } from "./pages/caretaker/edit-activity/EditActivityLoader";
import TermsAndConditions from "./pages/authorization/TermsAndConditions";
import Payment from "./pages/payment/Payment";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    loader: NewsLoader,
    element: (
      <>
        <LoggedInNavBar />
        <News />
      </>
    )
  },
  {
    path: "/article/:id",
    loader: NewsArticlePageLoader,
    element: (
      <>
        <LoggedInNavBar />
        <NewsArticlePage />
      </>
    )
  },
  {
    path: "/activities",
    loader: ActivitiesLoader,
    element: (
      <>
        <LoggedInNavBar />
        <Activities />
      </>
    )
  },
  {
    path: "/activity/:activityId",
    loader: ActivityLoader,
    element: (
      <>
        <LoggedInNavBar />
        <Activity />
      </>
    )
  },
  {
    path: "/match",
    loader: MatchLoader,
    element: (
      <>
        <LoggedInNavBar />
        <Match />
      </>
    )
  },
  {
    path: "/messages",
    // loader: FriendsLoader({ keepUnfriended: true }),
    loader: async () => {
      return await FriendsLoader({ keepUnfriended: true });
    },
    element: (
      <>
        <LoggedInNavBar />
        <Messages />
      </>
    )
  },
  {
    path: "/help",
    loader: HelpLoader,
    element: (
      <>
        <LoggedInNavBar />
        <Help />
      </>
    )
  },
  {
    path: "/auth",
    element: <Authorization />
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },
  {
    path: "/user/:id",
    element: (
      <>
        <UserProfile />
        <LoggedInNavBar />
      </>
    ),
    loader: UserProfileLoader
  },
  {
    path: "/user/:id/edit",
    element: <EditProfile />,
    loader: EditProfileLoader
  },
  {
    path: "/friends",
    element: (
      <>
        <LoggedInNavBar />
        <FriendsPage />
      </>
    ),
    children: [
      {
        path: "/friends/all",
        element: <Friends />,
        loader: FriendsLoader
      },
      {
        path: "/friends/friend-requests",
        element: <FriendRequests />,
        loader: FriendRequestsLoader
      }
    ]
  },
  {
    path: "/caretaker",
    element: (
      <>
        <LoggedInNavBar />
        <Caretaker />
      </>
    ),
    loader: CaretakerLoader,
    children: [
      {
        path: "/caretaker/news/new-article",
        element: <NewArticle />
      },
      {
        path: "/caretaker/news/posted-articles",
        element: <PostedArticles />,
        loader: MyArticlesLoader
      },
      {
        path: "/caretaker/news/:id/edit",
        element: <EditArticle />,
        loader: EditArticleLoader
      },
      {
        path: "/caretaker/activities/new-activity",
        element: <NewActivity />
      },
      {
        path: "/caretaker/activities",
        element: <CreatedActivities />,
        loader: CreatedActivitiesLoader
      },
      {
        path: "/caretaker/activities/:activityId/edit",
        element: <EditActivity />,
        loader: EditActivityLoader
      }
    ]
  },
  {
    path: "/frontpage",
    element: (
      <>
        <LoggedOutNavBar />
        <Frontpage />
      </>
    )
  },
  {
    path: "/about-us",
    element: (
      <>
        <LoggedOutNavBar />
        <AboutUs />
      </>
    )
  },
  {
    path: "/contact-us",
    element: (
      <>
        <LoggedOutNavBar />
        <ContactUs />
      </>
    )
  },
  {
    path: "/payment",
    element: <Payment />
  },
  {
    path: "*",
    element: <Navigate to="/" replace="true" />,
    loader: () => {
      console.log("Redirecting to root from ", window.location);
      return true;
    }
  }
]);

let logoutTimer;

function App() {
  const [currentUser, setCurrentUser] = useState({
    id: "",
    role: "",
    firstname: "",
    lastname: "",
    email: "",
    email_hash: "",
    postalcode: "",
    city: "",
    country: "",
    phone: "",
    premium: "",
    token: ""
  });
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const signupUser = async (email, password) => {
    try {
      const response = await signup(email, password);
      setCurrentUser(response);
      // Set token expiration time to two hours.
      const expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 2);
      setTokenExpiration(expiration);
      response.tokenExpiration = expiration;
      localStorage.setItem("currentUser", JSON.stringify(response));
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await login(email, password);
      setCurrentUser(response);
      // Set token expiration time to two hours.
      const expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 2);
      setTokenExpiration(expiration);
      response.tokenExpiration = expiration;
      localStorage.setItem("currentUser", JSON.stringify(response));
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const updateProfile = async () => {
    try {
      const response = await getUser(currentUser.id, currentUser.token);
      response.token = currentUser.token;
      setCurrentUser(response);
      // Set token expiration time to two hours.
      const expiration = new Date(new Date().getTime() + 1000 * 60 * 60 * 2);
      setTokenExpiration(expiration);
      response.tokenExpiration = expiration;
      localStorage.setItem("currentUser", JSON.stringify(response));
    } catch (error) {
      console.error(error.message);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser({
      id: "",
      role: "",
      firstname: "",
      lastname: "",
      email: "",
      email_hash: "",
      postalcode: "",
      city: "",
      country: "",
      phone: "",
      premium: "",
      token: ""
    });
    setTokenExpiration(null);
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    window.location.reload();
    console.log("User logged out");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (
      storedUser &&
      storedUser.token &&
      new Date(storedUser.tokenExpiration) > new Date()
    ) {
      const newTokenExpiration = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 2
      );
      setTokenExpiration(newTokenExpiration);
      storedUser.tokenExpiration = newTokenExpiration;
      localStorage.setItem("currentUser", JSON.stringify(storedUser));
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser.token && tokenExpiration) {
      const remaining = tokenExpiration.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logoutUser, remaining);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [currentUser, tokenExpiration]);

  return (
    <AuthContext.Provider
      value={{
        id: currentUser.id,
        role: currentUser.role,
        firstname: currentUser.firstname,
        lastname: currentUser.lastname,
        email: currentUser.email,
        email_hash: currentUser.email_hash,
        postalcode: currentUser.postalcode,
        city: currentUser.city,
        country: currentUser.country,
        phone: currentUser.phone,
        premium: currentUser.premium,
        token: currentUser.token,
        signup: signupUser,
        login: loginUser,
        updateProfile: updateProfile,
        logout: logoutUser
      }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
