import React from 'react';

class MainPanelHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshRate: 10,
      startDate: new Date(new Date().getTime() - 3600000),
      endDate: new Date()
    }
  }

  handleChange(e, stateName) {
    if (stateName === "refreshRate") {
      this.setState({[stateName]: e.target.value})
    } else {
      this.setState({[stateName]: e.target.valueAsDate})
    }

    return true;
  }

  asDate(date) {
    return date.toISOString().split('T')[0]
  }

  render() {
    return (
      <div className="panel-header bg-primary-gradient">
        <div className="page-inner py-5">
          <div className="d-flex align-items-left align-items-md-center flex-column flex-md-row">
            <div>
              <h2 className="text-white pb-2 fw-bold">Dashboard</h2>
              <h5 className="text-white op-7 mb-2"><i className="fas fa-bolt"/></h5>
            </div>
            <div className="ml-md-auto py-2 py-md-0 d-flex">
              <div className={"form-group form-group-default"}>
                <label htmlFor={"startDateInput"}>From</label>
                <input className={"form-control"} type={"date"} id={"startDateInput"} max={this.asDate(this.state.endDate)} value={this.asDate(this.state.startDate)} onChange={e => this.handleChange(e, "startDate")}/>
              </div>
              <div className={"form-group form-group-default ml-2"}>
                <label htmlFor={"endDateInput"}>Until</label>
                <input className={"form-control"} type={"date"} id={"endDateInput"} min={this.asDate(this.state.startDate)} value={this.asDate(this.state.endDate)} onChange={e => this.handleChange(e, "endDate")}/>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default MainPanelHeader
