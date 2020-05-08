import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import React, {Component} from "react";

class NoConnectionError extends Component {
  render() {
    return (<div className="page-inner mt--5">
      <Row addClassNames="mt--2">
        <Col width={12}>
          <Card>
            <div className={"text-center"} style={{opacity: 0.5}}>
              <i className={"far fa-times-circle text-muted"} style={{fontSize: "150px", opacity: 0.7}}/><br/>
              <h3 className={"mt-3"}>No connection to server established</h3>
            </div>
          </Card>
        </Col>
      </Row>
    </div>)
  }
}

export default NoConnectionError
