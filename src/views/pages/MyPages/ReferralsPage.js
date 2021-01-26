import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import ReferralLink from "../../ui-elements/cards/ReferralLink"
import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
import TreeView from "../../../extensions/treeview/TreeView"

let $primary = "#7367F0",
  $danger = "#EA5455",
  $danger_light = "#f29292",
  $stroke_color = "#e8e8e8",
  $label_color = "#e7eef7",
  $purple = "#df87f2"

class ReferralsPage extends React.Component {

    render(){
        return (
        <React.Fragment>
            <Row>
                <Col>
                    <ReferralLink />
                </Col>
            </Row>
            <Row>
                <Col className="m-3 text-center">
                    <h4>Cоздать уникальную страницу всех средств</h4>
                    <p>Вы сможете приглашать своих рефераллов посредством вашей уникально спроектированной странице!</p>
                    <Button.Ripple color="primary">Создать</Button.Ripple>
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

export default ReferralsPage