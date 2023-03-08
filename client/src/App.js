import {Suspense, useEffect} from "react";
import {HelmetProvider} from "react-helmet-async";
import {Toaster} from "react-hot-toast";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import AppRoutes from "./routes";
import FullBackLoader from "./common/components/Loaders/FullBackLoader";

import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "./features/user/userServices";

function App() {
  const dispatch = useDispatch();
  const {isLoggedIn, userProfile} = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserProfile());
    }
  }, [isLoggedIn, dispatch]);

  if (userProfile.loading) {
    return <FullBackLoader />;
  }

  return (
    <HelmetProvider>
      <Toaster position="top-right" duration={2000} />
      <Suspense fallback={<FullBackLoader />}>
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </Suspense>
    </HelmetProvider>
  );
}

export default App;
