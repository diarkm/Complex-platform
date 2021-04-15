import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { Package } from "react-feather"
import { ordersReceived, ordersReceivedSeries } from "./StatisticsData"

import { useIntl } from "react-intl";

function withLocale(Component) {
  return function WrappedComponent(props) {
    const intl = useIntl();
    return <Component {...props} intl={intl} />;
  };
}

class OrdersReceived extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<Package className="warning" size={22} />}
        iconBg="warning"
        stat="0"
        statTitle={this.props.intl.formatMessage({id: "Заказов сети"})}
        options={ordersReceived}
        series={ordersReceivedSeries}
        type="area"
      />
    )
  }
}
export default withLocale(OrdersReceived)
