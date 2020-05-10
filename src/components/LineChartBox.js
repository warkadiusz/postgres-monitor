import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import {Line} from "react-chartjs-2";
import React from "react";

class LineChartBox extends React.Component {
  chartReference = null;

  constructor(props) {
    super(props);

    this.cardTitle = props.cardTitle;
    this.cardSubtitle = props.cardSubtitle;
    this.maxDatapointsCount = props.maxDatapointsCount || 30;
    this.datasetTitle = props.datasetTitle || "No name";
    this.chartBackgroundColor = props.chartBackgroundColor || "transparent";
    this.chartBorderColor = props.chartBorderColor || "#2ba6f0";

    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: this.chartBackgroundColor,
            borderColor: this.chartBorderColor,
            label: this.datasetTitle
          }
        ]
      }
    };

    this.addDataPoint = this.addDataPoint.bind(this);
  }

  addDataPoint(time, value) {
    let updatedState = this.state.chartData;
    updatedState.labels.push(time);
    updatedState.datasets[0].data.push(value);
    if (updatedState.labels.length > this.maxDatapointsCount) {
      updatedState.labels.shift();
      updatedState.datasets[0].data.shift();
    }

    this.setState({chartData: updatedState}, () => {
      this.chartReference.chartInstance.update();
    });
  }

  render() {
    return (
      <div className="page-inner mt--5">
        <Row addClassNames="mt--2">
          <Col width={12}>
            <Card title={this.cardTitle} subtitle={this.cardSubtitle}>
              <Line
                ref={(reference) => this.chartReference = reference}
                data={this.state.chartData}
                height={50}
                options={{
                  maintainAspectRatio: true,
                  title: "aasd"
                }}/>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default LineChartBox
