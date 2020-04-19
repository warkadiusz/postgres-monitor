import React from 'react';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import MainPanelHeader from "./components/MainPanelHeader";
import MainCircles from "./components/MainCircles";


const AppName = "PostgresMonitor"

function App() {
  return (
    <div className="App">
      <Header appName={AppName}/>
      <Sidebar/>
      <div className="main-panel">
        <div className="content">
          <MainPanelHeader/>
          <div className="page-inner mt--5">
            <MainCircles></MainCircles>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
