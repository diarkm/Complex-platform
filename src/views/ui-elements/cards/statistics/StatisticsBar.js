import React from "react"
import { Row, Col, Card, CardBody, CardHeader } from "reactstrap"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
    UserCheck,
    ShoppingBag,
    Activity,
    DollarSign
  } from "react-feather"

import { FormattedMessage, useIntl } from "react-intl";

function withLocale(Component) {
  return function WrappedComponent(props) {
    const intl = useIntl();
    return <Component {...props} intl={intl} />;
  };
}
class StatisticsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: null,
      isResp: false
    };
  }
  render() {
    return (
      <Card>
        <SkeletonTheme color="#283046" highlightColor="#3F4860">
          <CardHeader>
              <FormattedMessage id="Статистика"/>
          </CardHeader>
          <CardBody>
              <Row>
              <Col xl="3" lg="4" sm="6">
              <StatisticsCard
                hideChart
                iconBg="primary"
                icon={<Activity className="primary" size={22} />}
                stat="0$"
                statTitle={this.props.intl.formatMessage({id: "Бонусы за день"})}
              />
            </Col>
            <Col xl="3" lg="4" sm="6">
              <StatisticsCard
                hideChart
                iconBg="info"
                icon={<UserCheck className="info" size={22} />}
                stat="0"
                statTitle={this.props.intl.formatMessage({id: "Рефераллов"})}
              />
            </Col>
            <Col xl="3" lg="4" sm="6">
              <StatisticsCard
                hideChart
                iconBg="warning"
                icon={<ShoppingBag className="warning" size={22} />}
                stat="0"
                statTitle={this.props.intl.formatMessage({id: "Заказов"})}
              />
            </Col>
            <Col xl="3" lg="4" sm="6">
              <StatisticsCard
                hideChart
                iconBg="success"
                icon={<DollarSign className="success" size={22} />}
                stat={this.props.isResp ? '$' + this.props.balance : <Skeleton width={60}/>}
                statTitle={this.props.intl.formatMessage({id: "Кошелек"})}
              />
            </Col>
              </Row>
          </CardBody>
        </SkeletonTheme>
      </Card>
    )
  }
}
export default withLocale(StatisticsBar)
