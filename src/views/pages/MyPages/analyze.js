import React from 'react'
import { Row, Col } from 'reactstrap'
import RevenueChart from "../../ui-elements/cards/analytics/Revenue"
import ReferralsReports from "../../ui-elements/cards/analytics/ReferralsReports"
import Sales from "../../ui-elements/cards/analytics/Sales2"
import Funds from "../../ui-elements/cards/analytics/Funds"
import SuberscribersGained from "../../ui-elements/cards/statistics/SubscriberGained"
import UserCards from "../../../components/@vuexy/statisticsCard/UserCards"
import img from "../../../assets/img/default-avatar.png"
import TokenStorage from '../../../api/tokenStorage';
import UserDataService from "../../../api/user-data-service"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

let $primary = "#7367F0",
  $danger = "#EA5455",
  $danger_light = "#f29292",
  $stroke_color = "#e8e8e8",
  $label_color = "#e7eef7",
  $purple = "#df87f2"

class Analyze extends React.Component {

    
  storage = new TokenStorage()

  state = {
    user: null,
    referral: null,
    userAvatar: null,
    referralAvatar: null
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
        this.setState({user: res.user, balance: res.balance, isResp: true});
        if (res.user.avatar)
          this.setState({userAvatar: `https://cabinet.giq-group.com/back/storage/app/${res.user.avatar}`})
        else
          this.setState({userAvatar: img})
      })
      .catch(err => console.log(err))

    this.userDataService.getReferralData()
      .then(res => {
        if(res.refer){
          this.setState({referral: res.refer})
          if (res.refer.avatar)
            this.setState({referralAvatar: `https://cabinet.giq-group.com/back/storage/app/${res.refer.avatar}`})
          else
            this.setState({referralAvatar: img})
        }
        else{
          this.setState({referral: {
            firstName: "Нет",
            lastName: "спонсора"
          }})
          this.setState({referralAvatar: img})
        }
      })
      .catch(err => console.log(err))
  }

    render(){
        const userStatus = this.state.user ? this.state.user.status ? this.state.user.status.name : 'Без статуса' : null

        return (
        <React.Fragment>
          <SkeletonTheme color="#283046" highlightColor="#3F4860">
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
                      icon={this.state.userAvatar}
                      stat={userStatus}
                      statTitle="Мой статус"
                  />
                  <UserCards
                      hideChart
                      iconBg="primary"
                      iconLeft
                      icon={this.state.referralAvatar}
                      stat={this.state.referral ? `${this.state.referral.firstName} ${this.state.referral.lastName}` : null}
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
            </SkeletonTheme>
        </React.Fragment>
    )}
}

export default Analyze