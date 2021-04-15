import React from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Chart from "react-apexcharts"
import { FormattedMessage, useIntl } from "react-intl";

function withLocale(Component) {
  return function WrappedComponent(props) {
    const intl = useIntl();
    return <Component {...props} intl={intl} />;
  };
}

class Sales2 extends React.Component {
  state = {
    options: {
      chart: {
        dropShadow: {
          enabled: true,
          top: 20,
          left: 2,
          blur: 6,
          opacity: 0.2
        },
        toolbar: { show: false }
      },
      stroke: {
        curve: "smooth",
        width: 4
      },
      grid: {
        borderColor: this.props.labelColor
      },
      legend: {
        show: false
      },
      colors: [this.props.purple],
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          inverseColors: false,
          gradientToColors: [this.props.primary],
          shadeIntensity: 1,
          type: "horizontal",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0,
        hover: {
          size: 5
        }
      },
      xaxis: {
        labels: {
          style: {
            colors: this.props.strokeColor
          }
        },
        axisTicks: {
          show: false
        },
        categories: [
          "Янв",
          "Фер",
          "Мар",
          "Апр",
          "Май",
          "Июн",
          "Июл",
          "Авг",
          "Сен",
          "Окт",
          "Ноя",
          "Дек"
        ],
        axisBorder: {
          show: false
        },
        tickPlacement: "on"
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            color: this.props.strokeColor
          },
          formatter: val => {
            return val > 999 ? (val / 1000).toFixed(1) + "k" : val
          }
        }
      },
      tooltip: {
        x: { show: false }
      }
    },
    series: [
      {
        name: "заработано, $",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  }

  componentDidMount() {
    this._isMounted = true;
    if(this._isMounted) {
      this.setState((state) => {
        state.series[0].name = this.props.intl.formatMessage({id: "заработано"}) + ", $";
        state.options.xaxis.categories[0] = this.props.intl.formatMessage({id: 'Янв'});
        state.options.xaxis.categories[1] = this.props.intl.formatMessage({id: 'Фев'});
        state.options.xaxis.categories[2] = this.props.intl.formatMessage({id: 'Мар'});
        state.options.xaxis.categories[3] = this.props.intl.formatMessage({id: 'Апр'});
        state.options.xaxis.categories[4] = this.props.intl.formatMessage({id: 'Май'});
        state.options.xaxis.categories[5] = this.props.intl.formatMessage({id: 'Июн'});
        state.options.xaxis.categories[6] = this.props.intl.formatMessage({id: 'Июл'});
        state.options.xaxis.categories[7] = this.props.intl.formatMessage({id: 'Авг'});
        state.options.xaxis.categories[8] = this.props.intl.formatMessage({id: 'Сен'});
        state.options.xaxis.categories[9] = this.props.intl.formatMessage({id: 'Окт'});
        state.options.xaxis.categories[10] = this.props.intl.formatMessage({id: 'Ноя'});
        state.options.xaxis.categories[11] = this.props.intl.formatMessage({id: 'Дек'});
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Card>
        <CardHeader>
          <div className="title">
            <CardTitle><FormattedMessage id="Всего заработано"/></CardTitle>
          </div>
        </CardHeader>
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={270}
          />
        </CardBody>
      </Card>
    )
  }
}
export default withLocale(Sales2)
