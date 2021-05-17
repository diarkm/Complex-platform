import React from "react";
import { Row, Col, Card, CardHeader } from "reactstrap";
import FundsWallet from "../../ui-elements/cards/analytics/FundsWallet";
import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained";
import TreeView from "../../../extensions/treeview/TreeView";
import DataTableOrders from "../../tables/data-tables/DataTableOrders";
import { FormattedMessage } from 'react-intl'

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
          <Card className="w-100 p-2">
            <h3></h3>
            <CardHeader className="mx-auto flex-column">
              <h4>
                <FormattedMessage id="Снятие средств" />
              </h4>
            </CardHeader>
            <p style={{textAlign: 'center'}}>
            <FormattedMessage id="Для снятия средств, пожалуйста обратитесь к администратору"/>
              <a href="mailto:giqgroup2021@gmail.com"> giqgroup2021@gmail.com</a>
            </p>
          </Card>
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
