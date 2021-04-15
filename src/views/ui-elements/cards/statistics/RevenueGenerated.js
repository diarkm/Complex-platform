import React from "react"
import StatisticsCard from "../../../../components/@vuexy/statisticsCard/StatisticsCard"
import { CreditCard } from "react-feather"
import { revenueGeneratedSeries, revenueGenerated } from "./StatisticsData"

import { useIntl } from "react-intl";

function withLocale(Component) {
  return function WrappedComponent(props) {
    const intl = useIntl();
    return <Component {...props} intl={intl} />;
  };
}

class RevenueGenerated extends React.Component {
  render() {
    return (
      <StatisticsCard
        icon={<CreditCard className="success" size={22} />}
        iconBg="success"
        stat="0$"
        statTitle={this.props.intl.formatMessage({id: "Доход в январе"})}
        options={revenueGenerated}
        series={revenueGeneratedSeries}
        type="area"
      />
    )
  }
}
export default withLocale(RevenueGenerated)
