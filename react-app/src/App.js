import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Topbar from "./components/Nav/Topbar";
import Sidebar from "./components/Nav/Sidebar";
import HomePage from "./components/HomePage";
import SingleVideoPage from "./components/SingleVideoPage";
import MyVideos from "./components/MyVideos";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            {/* <Topbar isLoaded={isLoaded} />
            <Sidebar isLoaded={isLoaded} /> */}
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            {/* <Topbar isLoaded={isLoaded} />
            <Sidebar isLoaded={isLoaded} /> */}
            <SignupFormPage />
            </Route>
          <Route exact path='/'>
            <Topbar isLoaded={isLoaded} />
            <Sidebar isLoaded={isLoaded} />
            <HomePage />
          </Route>

          <Route exact path='/MyVideos'>
            <Topbar isLoaded={isLoaded} />
            <MyVideos />
          </Route>
          
          <Route path='/Videos/:video_id'>
            <Topbar isLoaded={isLoaded} />
            <SingleVideoPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
