import React from "react"
import { Row, Col, Card, CardHeader, Button } from "reactstrap"
import img from "../../../assets/img/portrait/small/avatar-s-11.jpg";
import SalesCard from "./SalesCard"
import RevenueGenerated from "../../ui-elements/cards/statistics/RevenueGenerated"
import RevenueLastMonth from "../../ui-elements/cards/statistics/RevenueLastMonth"
import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
import Orders from "../../ui-elements/cards/statistics/OrdersReceived"
import UserCards from "../../../components/@vuexy/statisticsCard/UserCards"
import SalesStat from "../../ui-elements/cards/analytics/Sales"
import Funds from "../../ui-elements/cards/analytics/Funds"
import Statistics from "../../ui-elements/cards/statistics/StatisticsBar"
import ActivityTimeline from "./ActivityTimeline"
import RevenueChart from "../../ui-elements/cards/analytics/Revenue"
import ClientRetention from "../../ui-elements/cards/analytics/ClientRetention"
import "../../../assets/scss/pages/dashboard-analytics.scss"
import avatarImg from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import sponsorImg from "../../../assets/img/portrait/small/avatar-s-12.jpg"
import ReferralLink from "../../ui-elements/cards/ReferralLink"
import axios from 'axios';
import TokenStorage from '../../../api/tokenStorage';
import UserDataService from "../../../api/user-data-service"
import defaultAvatar from "../../../assets/img/default-avatar.png"

// const apiURL = 'https://cabinet.giq-group.com/back/public'

let $primary = "#7367F0",
  $danger = "#EA5455",
  $warning = "#FF9F43",
  $info = "#00cfe8",
  $primary_light = "#9c8cfc",
  $warning_light = "#FFC085",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#e8e8e8",
  $label_color = "#e7eef7",
  $white = "#fff"

class AnalyticsDashboard extends React.Component {

  storage = new TokenStorage()

  state = {
    user: null,
    referral: null,
    userAvatar: img,
    referralAvatar: sponsorImg
  }

  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  componentDidMount() {
    this.getUserData();
  }

  async getUserData() {
    this.userDataService.getUserData()
      .then(res => {
        console.log('res.user', res.user);
        this.setState({user: res.user})
        if (res.user.avatar)
          this.setState({userAvatar: `/${res.user.avatar}`})
        else
          this.setState({userAvatar: img})
      })
      .catch(err => console.log(err))

    this.userDataService.getReferralData()
      .then(res => {
        console.log('res.refer', res.refer);
        this.setState({referral: res.refer})
        if (res.user.avatar)
          this.setState({referralAvatar: `/${res.user.avatar}`})
        else
          this.setState({referralAvatar: sponsorImg})
      })
      .catch(err => console.log(err))

  }

  render() {
    const userStatus = this.state.user ? this.state.user.status ? this.state.user.status.name : 'Без статуса' : 'Без статуса'

    return (
      <React.Fragment>
        <Row>
          <Col className="match-height" lg="6" md="12" sm="12">
            <ClientRetention
              strokeColor={$stroke_color}
              primary={$primary}
              danger={$danger}
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
                icon={'https://cabinet.giq-group.com/back/storage/app' + this.state.userAvatar}
                stat={userStatus}
                statTitle="Мой статус"
              />
              <UserCards
                hideChart
                iconBg="primary"
                iconLeft
                icon={this.state.referral ? 'https://cabinet.giq-group.com/back/storage/app/' + this.state.referralAvatar : defaultAvatar}
                stat={this.state.referral ? `${this.state.referral.firstName} ${this.state.referral.lastName}` : 'Нет спонсора'}
                statTitle="Мой спонсор"
              />
          </Col>
        </Row>
        <Row>
          <Col md="4" sm="12">
            <SalesCard />
            <RevenueGenerated />
          </Col>
          <Col className="match-height" md="8" sm="12">
            <RevenueChart
              primary={$primary}
              dangerLight={$danger_light}
              strokeColor={$stroke_color}
              labelColor={$label_color}
            />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="8" md="12" sm="12">
            <Statistics />
          </Col>
          <Col lg="2" md="6" sm="12">
            <Orders />
          </Col>
          <Col lg="2" md="6" sm="12">
            <RevenueLastMonth />
          </Col>
        </Row>
        <Row className="match-height">
          <Col lg="4" md="6" sm="12">
            <SalesStat
              strokeColor={$stroke_color}
              infoLight={$info_light}
              primary={$primary}
              info={$info}
            />
          </Col>
          <Col lg="4" md="6" sm="12">
            <Card>
              <CardHeader className="mx-auto flex-column">
                <h4>Информация о пользователе</h4>
              </CardHeader>
              <div className="text-center pt-0 my-auto">
                  <h5>{this.state.user ? `${this.state.user.firstName} ${this.state.user.lastName}` : ''}</h5>
                  <p>{userStatus}</p>
                  <div className="avatar">
                    <img width="200" height="200" src={'https://cabinet.giq-group.com/back/storage/app' + this.state.userAvatar} alt="avatarImg" />
                  </div>
                  <div className="d-flex justify-content-around mt-2">
                    <div className="uploads">
                      <p className="font-weight-bold font-medium-2 mb-0">568</p>
                      <span>заказов</span>
                    </div>
                    <div className="followers">
                      <p className="font-weight-bold font-medium-2 mb-0">76</p>
                      <span>рефералов</span>
                    </div>
                    <div className="following">
                      <p className="font-weight-bold font-medium-2 mb-0">2000$</p>
                      <span>заработано</span>
                    </div>
                  </div>
                  <Button.Ripple className="btn-block gradient-light-primary mt-2">
                  Посмотреть структуру
                  </Button.Ripple>
              </div>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="12">
            <ActivityTimeline />
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12" sm="12">
            <ReferralLink />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default AnalyticsDashboard
