import React from 'react'
import { Row, Col, Button } from 'reactstrap'
import ReferralLink from "../../ui-elements/cards/ReferralLink"
import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
import TreeView from "../../../extensions/treeview/TreeView"
import { FormattedMessage } from "react-intl";

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
                    <h4><FormattedMessage id="Cоздать уникальную страницу всех средств"/></h4>
                    <p><FormattedMessage id="Вы сможете приглашать своих рефераллов посредством вашей уникально спроектированной странице!"/></p>
                    <Button.Ripple color="primary"><FormattedMessage id="Создать"/></Button.Ripple>
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
