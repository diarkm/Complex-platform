import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button
} from "reactstrap"
import DataTable, { createTheme } from "react-data-table-component"
import { Search } from "react-feather"

createTheme('dark-giq', {
  background: {
    default: 'transparent'
  }
})

const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
      <div className="add-new">
        <Button.Ripple color="primary">Снять средства</Button.Ripple>
      </div>
      <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </div>
  )
}

function getColor(stat){
  if(stat.status === 'пополнение'){
    return "success"
  } else if(stat.status === 'в обработке'){
    return "warning"
  } else {
    return "primary"
  }
}

class DataTableCustom extends React.Component {
  state = {
    columns: [
      {
        name: "Дата",
        selector: "date",
        sortable: true,
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.date}</p>
        )
      },
      {
        name: "Сумма",
        selector: "revenue",
        sortable: true,
        cell: row => <p className="text-bold-500 mb-0">{row.revenue}</p>
      },
      {
        name: "Статус",
        selector: "status",
        sortable: true,
        cell: row => (
          <Badge
            color={getColor(row)}
            pill>
            {row.status}
          </Badge>
        )
      }
    ],
    data: [
      {
        date: "May 13, 2018",
        status: "пополнение",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "пополнение",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "пополнение",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "пополнение",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "пополнение",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "в обработке",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      },
      {
        date: "May 13, 2018",
        status: "выполнено",
        revenue: "$32,000"
      }
    ],
    filteredData: [],
    value: ""
  }

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        let startsWithCondition =
          item.date.toLowerCase().startsWith(value.toLowerCase()) ||
          item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
          item.status.toLowerCase().startsWith(value.toLowerCase())
        let includesCondition =
          item.date.toLowerCase().includes(value.toLowerCase()) ||
          item.revenue.toLowerCase().includes(value.toLowerCase()) ||
          item.status.toLowerCase().includes(value.toLowerCase())

        if (startsWithCondition) {
          return startsWithCondition
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition
        } else return null
      })
      this.setState({ filteredData })
    }
  }

  render() {
    let { data, columns, value, filteredData } = this.state
    return (
      <Card>
        <CardHeader>
          <CardTitle>История транзакций</CardTitle>
        </CardHeader>
        <CardBody className="rdt_Wrapper">
          <DataTable
            className="dataTable-custom"
            data={value.length ? filteredData : data}
            columns={columns}
            noHeader
            pagination
            subHeader
            theme="dark-giq"
            subHeaderComponent={
              <CustomHeader value={value} handleFilter={this.handleFilter} />
            }
          />
        </CardBody>
      </Card>
    )
  }
}

export default DataTableCustom
