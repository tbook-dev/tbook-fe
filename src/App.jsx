import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';
import { useDispatch } from "react-redux";
import { fetchUserInfo } from './store/user'
// Import pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Fintech from './pages/Fintech';
import PlanList from './pages/incentive/PlanList';
import PlanCreate from './pages/incentive/PlanCreate';


import PageNotFound from './pages/utility/PageNotFound';
import Signin from './pages/Signin';
import CreateProject from './pages/CreateProject';

import PlanDetail from './pages/incentive/PlanDetail';
import GrantCreate from './pages/incentive/GrantCreate';
import GrantList from './pages/incentive/GrantList';

function App() {

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''

    const whileList  = ['/signin']

    if(!whileList.includes(location.pathname)){
      dispatch(fetchUserInfo())
    }
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/fintech" element={<Fintech />} />
        <Route path="/incentive" element={<PlanList />} />
        <Route path="/incentive/create" element={<PlanCreate />} />
        <Route path="/incentive/:id" element={<PlanDetail />} />
        <Route path="/incentive/grant" element={<GrantList />} />
        <Route path="/incentive/grant/:tipId/create" element={<GrantCreate />} />

      
        <Route path="/signin" element={<Signin />} />
        <Route path="/project-create" element={<CreateProject />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
