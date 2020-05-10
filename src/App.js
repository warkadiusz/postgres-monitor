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
      serverConnectionEstablished: false,
      serverHost: '',
    };

    this.updateServerHost = this.updateServerHost.bind(this)
    this.fetchDataBetween = this.fetchDataBetween.bind(this)
    this.switchToRealtime = this.switchToRealtime.bind(this)
    this.onWSMessage = this.onWSMessage.bind(this)
  }

  updateServerHost(newHost) {
    return new Promise((resolve, reject) => {
      this.setState({serverHost: newHost}, () => {
        this.tryToConnectWS().then(() => {
          this.setState({serverConnectionEstablished: true})
          this.switchToRealtime()
          resolve(true);
        }).catch(err => {
          alert('Cannot connect to server! Error: ' + err);
          reject(err);
        })
      });
    });
  }

  async fetchDataBetween(startDate, endDate) {
    this.setState({refreshRealtime: false}, () => {
      const host = "http://" + this.state.serverHost;
      startDate = startDate.toISOString().replace(/\.\d{3}Z$/, '')
      endDate = endDate.toISOString().replace(/\.\d{3}Z$/, '')
      for (const dataName in this.charts) {
        const url = host + "/data/" + dataName + "?after=" + startDate + "&before=" + endDate;

        fetch(url).then(r => r.json()).then(re => {
          Object.keys(re.data).forEach(date => {
            this.charts[dataName].addDataPoint(date, re.data[date])
          })
        }).catch(err => {
          alert('An error has occurred during data retrieving. Error: ' + err.message)
        })
      }
    });

  }

  switchToRealtime() {
    this.setState({refreshRealtime: true});
  }

  tryToConnectWS() {
    return new Promise((resolve, reject) => {
      if (!window["WebSocket"]) {
        reject("WebSocket not supported by browser.")
      }

      this.wsConnection = new WebSocket("ws://" + this.state.serverHost + "/ws");
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

      this.charts[statName].addDataPoint((new Date()).toLocaleTimeString(), dataObj.data[statName]);
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
              updateServerHost={this.updateServerHost}
              serverConnectionEstablished={this.state.serverConnectionEstablished}
            />

            <div className={this.state.serverConnectionEstablished ? '' : 'd-none'}>
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
            <div className={this.state.serverConnectionEstablished ? 'd-none' : ''}>
              <NoConnectionError/>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
