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
              stat="+$34"
              statTitle="Бонусы"
            />
          </Col>
          <Col xl="3" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="info"
              icon={<UserCheck className="info" size={22} />}
              stat="52"
              statTitle="Рефераллов"
            />
          </Col>
          <Col xl="3" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="warning"
              icon={<ShoppingBag className="warning" size={22} />}
              stat="23"
              statTitle="Заказов"
            />
          </Col>
          <Col xl="3" lg="4" sm="6">
            <StatisticsCard
              hideChart
              iconBg="success"
              icon={<DollarSign className="success" size={22} />}
              stat="$9745"
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
