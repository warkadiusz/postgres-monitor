import React from 'react';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import MainPanelHeader from "./components/MainPanelHeader";
import LineChartBox from "./components/LineChartBox";
import NoConnectionError from "./components/NoConnectionError";

class App extends React.Component {
  AppName = "PostgresMonitor"
  wsConnection = null;
  charts = [];

  constructor(props) {
    super(props);

    this.state = {
      refreshRealtime: true,
      WSConnectionEstablished: false,
      WSHost: '',
    };

    this.updateWSHost = this.updateWSHost.bind(this)
    this.fetchDataBetween = this.fetchDataBetween.bind(this)
    this.switchToRealtime = this.switchToRealtime.bind(this)
    this.onWSMessage = this.onWSMessage.bind(this)
  }

  updateWSHost(newHost) {
    return new Promise((resolve, reject) => {
        this.setState({WSHost: newHost}, () => {
          this.tryToConnectWS().then(() => {
            this.setState({WSConnectionEstablished: true})
            this.switchToRealtime()
            resolve(true);
          }).catch(err => {
            alert('Cannot connect to server! Error: ' + err);
            reject(err);
          })
        });
      }
    )
      ;
  }

  async fetchDataBetween(startDate, endDate) {

  }

  async switchToRealtime() {
   // throw new Error("NOPE");
  }

  tryToConnectWS() {
    return new Promise((resolve, reject) => {
      if (!window["WebSocket"]) {
        reject("WebSocket not supported by browser.")
      }


      this.wsConnection = new WebSocket("ws://" + this.state.WSHost + "/ws");
      this.wsConnection.onmessage = this.onWSMessage;
      this.wsConnection.onerror = function (err) {
        reject("WebSocket connection cannot be established.");
      };
      this.wsConnection.onopen = function (event) {
        resolve(true)
      }
    });
  }

  onWSMessage(event) {
    let dataObj = JSON.parse(event.data);

    if (dataObj.status === "datapoint" && parseInt(dataObj.code) === 200 && this.state.refreshRealtime) {
      let statName = Object.keys(dataObj.data)[0];

      this.charts[statName].addDataPoint(dataObj.data[statName]);
    }
  }

  render() {
    return (
      <div className="App">
        <Header appName={this.AppName}/>
        <Sidebar/>
        <div className="main-panel">
          <div className="content">
            <MainPanelHeader
              fetchDataBetween={this.fetchDataBetween}
              switchToRealtime={this.switchToRealtime}
              updateWSHost={this.updateWSHost}
            />

            <div className={this.state.WSConnectionEstablished ? '' : 'd-none'}>
              <LineChartBox
                cardTitle={"Database size"}
                cardSubtitle={"Database size in bytes over time"}
                datasetTitle={"Database size [b]"}
                ref={(reference) => this.charts["DatabaseSize"] = reference}
              />
              <LineChartBox
                cardTitle={"Number of connections"}
                cardSubtitle={"Number of open connections to database"}
                datasetTitle={"Open connections"}
                ref={(reference) => this.charts["NumberOfConnections"] = reference}
              />
              <LineChartBox
                cardTitle={"Number of running queries"}
                cardSubtitle={"Number of currently running queries"}
                datasetTitle={"Running queries"}
                ref={(reference) => this.charts["NumberOfRunningQueries"] = reference}
              />
              <LineChartBox
                cardTitle={"Number of long queries"}
                cardSubtitle={"Number of queries running longer than 15 seconds"}
                datasetTitle={"Long queries"}
                ref={(reference) => this.charts["NumberOfRunningQueriesOver15sec"] = reference}
              />
              <LineChartBox
                cardTitle={"Number of transactions"}
                cardSubtitle={"Total number of transactions executed in database."}
                datasetTitle={"Transactions"}
                ref={(reference) => this.charts["TotalNumberOfTransactions"] = reference}
              />
            </div>
            <div className={this.state.WSConnectionEstablished ? 'd-none' : ''}>
              <NoConnectionError/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
