import React from 'react';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import MainPanelHeader from "./components/MainPanelHeader";
import LineChartBox from "./components/LineChartBox";

class App extends React.Component {
  AppName = "PostgresMonitor"
  wsConnection = null;
  charts = [];

  constructor(props) {
    super(props);

    this.state = {
      wsMessage: '',
      socketResponses: [],
    };

    this.updateWSModel = this.updateWSModel.bind(this)
    this.sendSocketMessage = this.sendSocketMessage.bind(this)
  }

  updateWSModel(e) {
    this.setState({wsMessage: e.target.value})
    return true
  }

  sendSocketMessage(event) {
    this.wsConnection.send(this.state.wsMessage)
    this.setState({wsMessage: ''})
  }

  componentDidMount = () => {
    this.setupSocket()
  }

  setupSocket = () => {
    if (!window["WebSocket"]) {
      return false;
    }

    console.log("websocket supported, trying to connect")
    this.wsConnection = new WebSocket("ws://localhost:8090/ws");
    this.wsConnection.onopen = function (event) {
      console.log("ws connection open")
    }

    this.wsConnection.onclose = function (evt) {
      console.log("connection closed")
    };

    this.wsConnection.onmessage = event => {
      this.state.socketResponses.push(event.data)

      let dataObj = JSON.parse(event.data);
      console.log(dataObj);
      if(dataObj.status == "datapoint" && dataObj.code == 200) {
        let nameValuePair = JSON.parse(dataObj.data);
        let statName = Object.keys(nameValuePair)[0];

        this.charts[statName].addDataPoint(nameValuePair[statName]);
      }

      this.setState({})
    };
  }

  render() {
    return (
      <div className="App">
        <Header appName={this.AppName}/>
        <Sidebar/>
        <div className="main-panel">
          <div className="content">
            <MainPanelHeader/>

            <LineChartBox
              cardTitle={"Database size"}
              cardSubtitle={"Database size in bytes over time"}
              datasetTitle={"Database size [b]"}
              ref={ (reference) => this.charts["DatabaseSize"] = reference }
            />
            <LineChartBox
              cardTitle={"Number of connections"}
              cardSubtitle={"Number of open connections to database"}
              datasetTitle={"Open connections"}
              ref={ (reference) => this.charts["NumberOfConnections"] = reference }
            />
            <LineChartBox
              cardTitle={"Number of running queries"}
              cardSubtitle={"Number of currently running queries"}
              datasetTitle={"Running queries"}
              ref={ (reference) => this.charts["NumberOfRunningQueries"] = reference }
            />
            <LineChartBox
              cardTitle={"Number of long queries"}
              cardSubtitle={"Number of queries running longer than 15 seconds"}
              datasetTitle={"Long queries"}
              ref={ (reference) => this.charts["NumberOfRunningQueriesOver15sec"] = reference }
            />
            <LineChartBox
              cardTitle={"Number of transactions"}
              cardSubtitle={"Total number of transactions executed in database."}
              datasetTitle={"Transactions"}
              ref={ (reference) => this.charts["TotalNumberOfTransactions"] = reference }
            />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
