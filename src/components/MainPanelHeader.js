import React from 'react';

class MainPanelHeader extends React.Component {
  serverHostInputRef = null;

  constructor(props) {
    super(props);
    this.state = {
      refreshRate: 10,
      startDate: new Date(new Date().getTime() - 3600000),
      endDate: new Date(),
      loading: false,
      connecting: false,
      serverConnectionEstablished: false
    }

    this.loadPastData = this.loadPastData.bind(this);
    this.disableInputs = this.disableInputs.bind(this);
    this.switchToRealtime = this.switchToRealtime.bind(this);
    this.sendUpdateServerHost = this.sendUpdateServerHost.bind(this);
  }

  sendUpdateServerHost() {
    this.setState({connecting: true})

    this.props.updateServerHost(this.serverHostInputRef.value).then(() => {
      this.setState({connecting: false})
    }).catch(() => {
      this.setState({connecting: false})
    })
  }

  handleChange(e, stateName) {
    this.setState({[stateName]: e.target.valueAsDate})

    return true;
  }

  asDate(date) {
    return date.toISOString().split('T')[0]
  }

  loadPastData() {
    this.setState({loading: true});
    this.props.fetchDataBetween(this.state.startDate, this.state.endDate).then(() => this.setLoadingStop());
  }

  switchToRealtime() {
    this.setState({loading: true});
    this.props.switchToRealtime();
    this.setLoadingStop();
  }

  setLoadingStop() {
    this.setState({loading: false})
  }

  disableInputs() {
    return this.state.loading || this.state.connecting || !this.props.serverConnectionEstablished;
  }

  render() {
    return (
      <div className="panel-header bg-primary-gradient">
        <div className="page-inner py-5">
          <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
            <div>
              <h2 className="text-white pb-2 fw-bold">
                <span className="text-white op-7 mb-2"><i className="fas fa-bolt"/></span>&nbsp;
                Dashboard
              </h2>
              <div className={"form-group form-group-default d-flex py-2"}>
                <input
                  className={"form-control mt-0"}
                  type={"text"}
                  placeholder={"Server host"}
                  ref={r => this.serverHostInputRef = r}
                  disabled={this.state.connecting}
                />
                <button
                  className={"btn btn-info btn-sm"}
                  disabled={this.state.connecting}
                  onClick={this.sendUpdateServerHost}
                >
                  <i className={"fa fa-spin fa-spinner " + (this.state.connecting ? '' : 'd-none')}/>&nbsp;

                  Connect »
                </button>
              </div>
            </div>
            <div className="ml-md-auto py-2 py-md-0 d-flex">
              <div className={"form-group form-group-default"}>
                <label htmlFor={"startDateInput"}>From</label>
                <input
                  className={"form-control"}
                  type={"date"}
                  id={"startDateInput"}
                  max={this.asDate(this.state.endDate)}
                  value={this.asDate(this.state.startDate)}
                  onChange={e => this.handleChange(e, "startDate")}
                  disabled={this.state.loading}
                />
              </div>
              <div className={"form-group form-group-default ml-2"}>
                <label htmlFor={"endDateInput"}>Until</label>
                <input
                  className={"form-control"}
                  type={"date"}
                  id={"endDateInput"}
                  min={this.asDate(this.state.startDate)}
                  value={this.asDate(this.state.endDate)}
                  onChange={e => this.handleChange(e, "endDate")}
                  disabled={this.state.loading}
                />
              </div>
              <div className={"form-group ml-2 pt-0"}>
                <button className={"btn btn-primary btn-block btn-xs"} onClick={this.loadPastData} disabled={this.disableInputs()}>
                  <i className={"fa fa-spin fa-spinner " + (this.state.loading ? '' : 'd-none')}/>&nbsp;
                  Load »
                </button>
                <button className={"btn btn-primary btn-block btn-xs mt-1"} onClick={this.switchToRealtime} disabled={this.disableInputs()}>
                  <i className={"fa fa-spin fa-spinner " + (this.state.loading ? '' : 'd-none')}/>&nbsp;
                  Realtime <i className={"fa fa-stopwatch"}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default MainPanelHeader
