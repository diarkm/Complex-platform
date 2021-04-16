import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"
import { MoreVertical } from "react-feather"

import { FormattedMessage, useIntl } from "react-intl";

function withLocale(Component) {
  return function WrappedComponent(props) {
    const intl = useIntl();
    return <Component {...props} intl={intl} />;
  };
}
class Sales extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      options: {
        chart: {
          dropShadow: {
            enabled: true,
            blur: 8,
            left: 1,
            top: 1,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        stroke: {
          width: 0
        },
        colors: [this.props.primary, this.props.info],
        plotOptions: {
          radar: {
            polygons: {
              strokeColors: [
                this.props.strokeColor,
                "transparent",
                "transparent",
                "transparent",
                "transparent",
                "transparent"
              ],
              connectorColors: "transparent"
            }
          }
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#9f8ed7", this.props.infoLight],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100, 100]
          }
        },
        markers: {
          size: 0
        },
        legend: {
          show: false
        },
        labels: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн"],
        dataLabels: {
          style: {
            colors: [
              this.props.strokeColor,
              this.props.strokeColor,
              this.props.strokeColor,
              this.props.strokeColor,
              this.props.strokeColor,
              this.props.strokeColor
            ]
          }
        },
        yaxis: {
          show: false
        },
        grid: {
          show: false
        }
      },
      series: [
        {
          name: "Бонусы за депозит",
          data: [0, 0, 0, 0, 0, 0]
        },
        {
          name: "Бонусы за рефералов",
          data: [0, 0, 0, 0, 0, 0]
        }
      ]
    }
    this.state.series[0].name = this.props.intl.formatMessage({id: "Бонусы за депозит"});
    this.state.series[1].name = this.props.intl.formatMessage({id: "Бонусы за рефералов"});
    this.state.options.labels[0] = this.props.intl.formatMessage({id: "Янв"});
    this.state.options.labels[1] = this.props.intl.formatMessage({id: "Фев"});
    this.state.options.labels[2] = this.props.intl.formatMessage({id: "Мар"});
    this.state.options.labels[3] = this.props.intl.formatMessage({id: "Апр"});
    this.state.options.labels[4] = this.props.intl.formatMessage({id: "Май"});
    this.state.options.labels[5] = this.props.intl.formatMessage({id: "Июн"});
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <div className="title">
            <CardTitle><FormattedMessage id="Бонусы"/></CardTitle>
            <p className="text-muted mb-0"><FormattedMessage id="За полгода"/></p>
          </div>
          <MoreVertical className="cursor-pointer" size={20} />
        </CardHeader>
        <CardBody>
          <div className="item-info d-inline-block mr-2">
            <div
              className="bg-primary"
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "5px"
              }}
            />
            <span><FormattedMessage id="Бонусы за депозит"/></span>
          </div>
          <div className="item-info d-inline-block">
            <div
              className="bg-info"
              style={{
                height: "10px",
                width: "10px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "5px"
              }}
            />
            <span><FormattedMessage id="Бонусы за рефералов"/></span>
          </div>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="radar"
            height={400}
          />
        </CardBody>
      </Card>
    )
  }
}
export default withLocale(Sales)
