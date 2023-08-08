import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./client/pages/home/Home";
import ListRoom from "./client/pages/list/ListRoom";
import List from "./client/pages/list/List";
import Hotel from "./client/pages/hotel/Hotel";
import Room from "./client/pages/room/Room";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import Hotels from "./admin/pages/hotels/Hotels";
import Header from "./client/components/header/Header";
import Demo from "./client/demo/Demo";
import Footer from "./client/components/footer/Footer";
import Login from "./client/pages/login/Login";
import LoginAdmin from "./admin/pages/loginadmin/LoginAdmin";
import { AuthContext } from "./client/context/AuthContext";
import { useContext } from "react";
import Rooms from "./admin/pages/rooms/Rooms";
import Bookings from "./admin/pages/bookings/Bookings";
function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if(user && user.isAdmin === true){
      return children;
    }else{
      return <Navigate to="/admin/login" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/demo"
          element={
            <>
              <Demo />
            </>
          }
        />
        <Route
          path="/hotels"
          element={
            <>
              <Header />
              <List />
              <Footer />
            </>
          }
        />
        <Route
          path="/hotels/:id"
          element={
            <>
              <Header />
              <Hotel />
              <Footer />
            </>
          }
        />
        <Route
          path="/rooms"
          element={
            <>
              <Header />
              <ListRoom />
              <Footer />
            </>
          }
        />
        <Route
          path="/roomdetail"
          element={
            <>
              <Header />
              <Room />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
              <Footer />
            </>
          }
        />
        <Route path="/admin/*">
          <Route
            index
            element={
              <>
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="hotels"
            element={
              <>
              <ProtectedRoute>
              <Hotels />
              </ProtectedRoute>
                
              </>
            }
          />
          <Route
            path="rooms"
            element={
              <>
              <ProtectedRoute>
              <Rooms />
              </ProtectedRoute>
                
              </>
            }
          />
          <Route
            path="bookings"
            element={
              <>
              <ProtectedRoute>
              <Bookings />
              </ProtectedRoute>
                
              </>
            }
          />
          <Route
            path="login"
            element={
              <>
                <LoginAdmin />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
