import React from "react"
import { Row, Col, Card, CardHeader, Button } from "reactstrap"
import img from "../../../assets/img/default-avatar.png"
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
import ReferralLink from "../../ui-elements/cards/ReferralLink"
import TokenStorage from '../../../api/tokenStorage';
import UserDataService from "../../../api/user-data-service"
import { history } from "../../../history"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FormattedMessage, useIntl } from "react-intl";

function withLocale(Component) {
  return function WrappedComponent(props) {
    const intl = useIntl();
    return <Component {...props} intl={intl} />;
  };
}

// const apiURL = 'https://cabinet.giq-group.com/back/public'

let $primary = "#7367F0",
  $danger = "#EA5455",
  $info = "#00cfe8",
  $danger_light = "#f29292",
  $info_light = "#1edec5",
  $stroke_color = "#e8e8e8",
  $label_color = "#e7eef7"

class AnalyticsDashboard extends React.Component {

  storage = new TokenStorage()

  state = {
    user: null,
    referral: null,
    userAvatar: null,
    referralAvatar: null,
    balance: null,
    isResp: false
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
          if(this.props.intl.locale === 'ru'){
            this.setState({referral: {
              firstName: "Нет",
              lastName: "спонсора"
            }})
          } else {
            this.setState({referral: {
              firstName: "No",
              lastName: "sponsor"
            }})
          }
          this.setState({referralAvatar: img})
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const userStatus = this.state.user ? this.state.user.status ? this.state.user.status.name : this.props.intl.locale === 'ru' ? 'Без статуса' : 'No status' : null;

    return (
      <React.Fragment>
        <SkeletonTheme color="#283046" highlightColor="#3F4860">
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
                  icon={this.state.userAvatar}
                  stat={userStatus}
                  statTitle={this.props.intl.formatMessage({id: "Мой статус"})}
                />
                <UserCards
                  hideChart
                  iconBg="primary"
                  iconLeft
                  icon={this.state.referralAvatar}
                  stat={this.state.referral ? `${this.state.referral.firstName} ${this.state.referral.lastName}` : null}
                  statTitle={this.props.intl.formatMessage({id: "Мой спонсор"})}
                />
            </Col>
          </Row>
          <Row>
            <Col md="4" sm="12">
              <SalesCard name={this.state.user ? this.state.user.firstName : ""}/>
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
            <Col lg="8" md="10" sm="12">
              <Statistics balance={this.state.balance} isResp = {this.state.isResp}/>
            </Col>
            <Col lg="2" md="7" sm="12">
              <Orders />
            </Col>
            <Col lg="2" md="7" sm="12">
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
                  <h4><FormattedMessage id="Информация о пользователе"/></h4>
                </CardHeader>
                <div className="text-center pt-0 my-auto">
                    <h5>{this.state.user ? `${this.state.user.firstName} ${this.state.user.lastName}` : <Skeleton width={100}/>}</h5>
                    <p>{userStatus || <Skeleton width={60}/>}</p>
                    <div className="avatar" style={{width:200,height:200,overflow:"hidden"}}>
                      {this.state.userAvatar ? <img style={{borderRadius:0, width: "100%", objectFit: "cover"}}  src={this.state.userAvatar} alt="avatarImg" /> : <Skeleton width={200} height={200} circle={true}/>}
                    </div>
                    <div className="d-flex justify-content-around mt-2">
                      <div className="uploads">
                        <p className="font-weight-bold font-medium-2 mb-0">0</p>
                        <span><FormattedMessage id="заказов"/></span>
                      </div>
                      <div className="followers">
                        <p className="font-weight-bold font-medium-2 mb-0">0</p>
                        <span><FormattedMessage id="рефераллов"/></span>
                      </div>
                      <div className="following">
                        <p className="font-weight-bold font-medium-2 mb-0">{this.state.isResp ? "$" + this.state.balance : <Skeleton />}</p>
                        <span><FormattedMessage id="заработано"/></span>
                      </div>
                    </div>
                    <Button.Ripple
                      color="primary"
                      className="mt-2 mb-2"
                      onClick={() => history.push("/referrals")}
                      >
                      <FormattedMessage id="Посмотреть структуру"/>
                    </Button.Ripple>
                </div>
              </Card>
            </Col>
            <Col lg="4" md="6" sm="12">
              <ActivityTimeline name={this.state.user ? this.state.user.firstName : ""}/>
            </Col>
          </Row>
          <Row>
            <Col lg="12" md="12" sm="12">
              <ReferralLink />
            </Col>
          </Row>
        </SkeletonTheme>
      </React.Fragment>
    )
  }
}

export default withLocale(AnalyticsDashboard)
