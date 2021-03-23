import React from "react"
import { Row, Col, Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {
    Monitor,
    UserCheck,
    Mail,
    Eye,
    MessageSquare,
    ShoppingBag,
    Heart,
    Smile,
    Truck,
    Cpu,
    Server,
    Activity,
    AlertOctagon,
    DollarSign
  } from "react-feather"

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
              Статистика
          </CardHeader>
          <CardBody>
              <Row>
              <Col xl="3" lg="4" sm="6">
              <StatisticsCard
                hideChart
                iconBg="primary"
                icon={<Activity className="primary" size={22} />}
                stat="0$"
                statTitle="Бонусы за день"
              />
            </Col>
            <Col xl="3" lg="4" sm="6">
              <StatisticsCard
                hideChart
                iconBg="info"
                icon={<UserCheck className="info" size={22} />}
                stat="0"
                statTitle="Рефераллов"
              />
            </Col>
            <Col xl="3" lg="4" sm="6">
              <StatisticsCard
                hideChart
                iconBg="warning"
                icon={<ShoppingBag className="warning" size={22} />}
                stat="0"
                statTitle="Заказов"
              />
            </Col>
            <Col xl="3" lg="4" sm="6">
              <StatisticsCard
                hideChart
                iconBg="success"
                icon={<DollarSign className="success" size={22} />}
                stat={this.props.isResp ? '$' + this.props.balance : <Skeleton width={60}/>}
                statTitle="Кошелек"
              />
            </Col>
              </Row>
          </CardBody>
        </SkeletonTheme>
      </Card>
    )
  }
}
export default StatisticsBar
