import React from "react";
import {
  Row,
  Col,
} from "reactstrap";
import FundsWallet from "../../ui-elements/cards/analytics/FundsWallet";
import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained";
import TreeView from "../../../extensions/treeview/TreeView";
import DataTableOrders from "../../tables/data-tables/DataTableOrders";

class Wallet extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="4" md="4" sm="12">
            <FundsWallet />
          </Col>
          <Col lg="8" md="8" sm="12">
            <DataTableOrders />
          </Col>
        </Row>
        <Row>
          <Col className="match-height" lg="8" md="8" sm="12">
            <TreeView />
          </Col>
          <Col className="match-height" lg="4" md="4" sm="12">
            <SuberscribersGained />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Wallet;
