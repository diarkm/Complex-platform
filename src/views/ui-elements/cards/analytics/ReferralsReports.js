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

class ReferralsReports extends React.Component {
  constructor(props){
    super(props);
    this._isMounted = false;
  }
  state = {
    options: {
      chart: {
        stacked: true,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          columnWidth: "10%"
        }
      },
      colors: [this.props.primary, this.props.danger],
      dataLabels: {
        enabled: false
      },
      grid: {
        borderColor: this.props.labelColor,
        padding: {
          left: 0,
          right: 0
        }
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "left",
        offsetX: 0,
        fontSize: "14px",
        markers: {
          radius: 50,
          width: 10,
          height: 10
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
          "Фев",
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
        }
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            color: this.props.strokeColor
          }
        }
      },
      tooltip: {
        x: { show: false }
      }
    },
    series: [
      {
        name: "Рефералов",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  }

  componentDidMount() {
    this._isMounted = true;
    if(this._isMounted) {
      this.setState((state) => {
        state.series[0].name = this.props.intl.formatMessage({ id: "рефераллов" });
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
          <CardTitle><FormattedMessage id="Количество рефералов"/></CardTitle>
        </CardHeader>
        <CardBody>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={290}
            id="client-retention-chart"
          />
        </CardBody>
      </Card>
    )
  }

}
export default withLocale(ReferralsReports)
