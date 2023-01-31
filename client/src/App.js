import './App.css'
import Navbar from './components/Header/Navbar';
import Landing from './components/Landing/Landing';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';
import { Provider } from 'react-redux';
import Alert from './components/AlertBox/Alert';
import setAuthToken from './utils/setAuthToken';
import { useEffect } from 'react';
import { loadUser } from './actions/auth';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/Profile/CreateProfile';
import Developers from './components/DevelopersPage/Developers';
import DashBoardProfile from './components/Dashboard/DashBoardProfile';
import AddProject from './components/Project/AddProject';
import Projects from './components/Project/Projects';
import SoloDeveloper from './components/DevelopersPage/SoloDeveloper';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Sidebar />
          <Route exact path="/" component={Landing} />
          <section class="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/createProfile" component={CreateProfile} />
              <Route exact path="/developers" component={Developers} />
              <PrivateRoute exact path="/editProfile" component={DashBoardProfile} />
              <PrivateRoute exact path="/addProject" component={AddProject} />
              <PrivateRoute exact path="/projects" component={Projects} />
              <Route exact path="/developer/:id" component={SoloDeveloper} />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
