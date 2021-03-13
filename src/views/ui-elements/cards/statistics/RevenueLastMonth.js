import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { CreditCard } from "react-feather"
import { revenueGeneratedSeries, revenueGenerated } from "./StatisticsData"

class RevenueLastMonth extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<CreditCard className="success" size={22} />}
        iconBg="success"
        stat="0"
        statTitle="Доход за прошлый месяц"
        options={revenueGenerated}
        series={revenueGeneratedSeries}
        type="area"
      />
    )
  }
}
export default RevenueLastMonth
