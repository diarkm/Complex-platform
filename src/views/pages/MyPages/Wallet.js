import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import FundsWallet from "../../ui-elements/cards/analytics/FundsWallet"
import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
import TreeView from "../../../extensions/treeview/TreeView"
import DataTableTransaction from "../../tables/data-tables/DataTableTransaction"

let $primary = "#7367F0",
  $danger = "#EA5455",
  $danger_light = "#f29292",
  $stroke_color = "#e8e8e8",
  $label_color = "#e7eef7",
  $purple = "#df87f2"

class Wallet extends React.Component {

    render(){
        return (
        <React.Fragment>
            <Row className="match-height">
                <Col lg="4" md="4" sm="12">
                    <FundsWallet />
                </Col>
                <Col lg="8" md="8" sm="12">
                    <DataTableTransaction />
                </Col>
            </Row>
            <Row>
                <Col className="match-height" lg="8" md="8" sm="12">
                    <TreeView/>
                </Col>
                <Col className="match-height" lg="4" md="4" sm="12">
                    <SuberscribersGained />
                </Col>
            </Row>
        </React.Fragment>
    )}
}

export default Wallet