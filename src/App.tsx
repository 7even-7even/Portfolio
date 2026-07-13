import { lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { LoadingProvider } from "./context/LoadingProvider";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));

const RouteFallback = () => (
  <main className="route-message" role="status">
    <p>Loading page…</p>
  </main>
);

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoadingProvider>
              <Suspense fallback={<RouteFallback />}>
                <MainContainer>
                  <Suspense fallback={null}>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              </Suspense>
            </LoadingProvider>
          }
        />
        <Route
          path="/myworks"
          element={
            <Suspense fallback={<RouteFallback />}>
              <MyWorks />
            </Suspense>
          }
        />
        <Route
          path="/play"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Play />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <main className="route-message">
              <h1>Page not found</h1>
              <p>The page you requested does not exist.</p>
              <Link to="/">Return home</Link>
            </main>
          }
        />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
