import React from 'react'
import { Row, Col } from 'reactstrap'
import RevenueChart from "../../ui-elements/cards/analytics/Revenue"
import ReferralsReports from "../../ui-elements/cards/analytics/ReferralsReports"
import Sales from "../../ui-elements/cards/analytics/Sales2"
import Funds from "../../ui-elements/cards/analytics/Funds"
import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
import UserCards from "../../../components/@vuexy/statisticsCard/UserCards"
import avatarImg from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import sponsorImg from "../../../assets/img/portrait/small/avatar-s-12.jpg"

let $primary = "#7367F0",
  $danger = "#EA5455",
  $danger_light = "#f29292",
  $stroke_color = "#e8e8e8",
  $label_color = "#e7eef7",
  $purple = "#df87f2"

class Analyze extends React.Component {

    render(){
        return (
        <React.Fragment>
            <Row>
            <Col className="match-height" lg="6" md="12" sm="12">
                <RevenueChart
                primary={$primary}
                dangerLight={$danger_light}
                strokeColor={$stroke_color}
                labelColor={$label_color}
                />
            </Col>
            <Col className="match-height" lg="3" md="6" sm="12">
                <Funds />
            </Col>
            <Col lg="3" md="6" sm="12">
                <SuberscribersGained />
                <UserCards
                    hideChart
                    iconBg="primary"
                    iconLeft
                    icon={avatarImg}
                    stat="INTESTOR GIQ-S"
                    statTitle="Мой статус"
                />
                <UserCards
                    hideChart
                    iconBg="primary"
                    iconLeft
                    icon={sponsorImg}
                    stat="Эмма Уотсон"
                    statTitle="Мой спонсор"
                />
            </Col>
            </Row>
            <Row>
                <Col>
                    <Sales
                        strokeColor={$stroke_color}
                        primary={$primary}
                        purple={$purple}
                        labelColor={$label_color}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ReferralsReports 
                        strokeColor={$stroke_color}
                        primary={$primary}
                        danger={$danger}
                        labelColor={$label_color}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )}
}

export default Analyze