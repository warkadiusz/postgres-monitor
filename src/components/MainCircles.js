import Col from "./Col";
import Card from "./Card";
import Circle from "./Circle";
import Row from "./Row";
import React from "react";

class MainCircles extends React.Component {
  render() {
    return (<Row addClassNames="mt--2">
      <Col>
        <Card title="Overview" subtitle="Quick overview of most important metrics">
          <div className={"d-flex flex-wrap justify-content-around pb-2 pt-4"}>
            <Circle value={50} fgColor={"#ff9d3f"} title="Transactions" onclick={this.handleClick}/>
            <Circle value={99} fgColor={"#2ba6f0"} title="Queries" onclick={this.handleClick}/>
            <Circle value={25} fgColor={"#00b941"} title="Memory usage" onclick={this.handleClick}/>
            <Circle value={17} fgColor={"#f85865"} title="CPU usage" onclick={this.handleClick}/>
          </div>
        </Card>
      </Col>
    </Row>)
  }

  handleClick() {
    alert("asd!");
  }
}

export default MainCircles;
