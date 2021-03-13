import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Package } from "react-feather"
import { ordersReceived, ordersReceivedSeries } from "./StatisticsData"

class OrdersReceived extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<Package className="warning" size={22} />}
        iconBg="warning"
        stat="0"
        statTitle="Заказов сети"
        options={ordersReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    )
  }
}
export default OrdersReceived
