import React from "react"
import { Row, Col, Card, CardBody, CardHeader, CardTitle } from "reactstrap"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
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
      balance: null
    };
  }
  render() {
    return (
      <Card>
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
              stat="0"
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
              stat={'$' + this.props.balance}
              statTitle="Кошелек"
            />
          </Col>
            </Row>
        </CardBody>
      </Card>
    )
  }
}
export default StatisticsBar
