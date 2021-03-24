import Prism from "prismjs";
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
import UserDataService from "../../../api/user-data-service";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

createTheme('dark-giq', {
  background: {
    default: 'transparent'
  }
})

const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-end">
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
let $primary = "#7367F0"
class DataTableOrders extends React.Component {
  state = {
    columns: [
      {
        name: "ID транзакции",
        selector: "id",
        sortable: true,
        sortFunction: (a, b) =>{
          return b.id - a.id;
        },
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.id}</p>
        )
      },
      {
        name: "Дата",
        selector: "created_at",
        sortable: true,
        sortFunction: (a, b) =>{
              return new Date(b.created_at) - new Date(a.created_at);
        },
        cell: row => (
          <p className="text-bold-500 text-truncate mb-0">{row.created_at.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}</p>
        )
      },
      {
        name: "Сумма",
        selector: "value",
        sortFunction: (a, b) =>{
          return b.value - a.value;
        },
        sortable: true,
        cell: row => <p className="text-bold-500 mb-0">{row.value}</p>
      },
      {
        name: "Статус ID",
        selector: "status",
        sortable: true,
        sortFunction: (a, b) =>{
          return  a.status.id - b.status.id;
        },
        cell: row => (
          <Badge
            color={getColor(row)}
            pill>
            {row.status.name}
          </Badge>
        )
      }
    ],
    data: null,
    filteredData: [],
    value: "",
    page: 1,
    pages : 0
  }

  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  componentDidMount() {
    this.getTransactions();
  }

  getTransactions() {
    this.userDataService.getTransactions()
      .then(res => {
        console.log('DataTableOrders.getTransactions', res.data)

        this.setState({data: res.data.collection})
        this.setState({pages: res.data.pages})
      })
      .catch(err => console.log(err))
  }

  render() {
    let { data, columns } = this.state
    return (
      <Card>
        <SkeletonTheme color="#283046" highlightColor="#3F4860">
          <CardHeader>
            <CardTitle>История транзакций</CardTitle>
          </CardHeader>
          <CardBody className="rdt_Wrapper">
            {data ?
              <DataTable
                className="dataTable-custom"
                data={data}
                columns={columns}
                noHeader
                pagination
                noDataComponent={<h4>У вас нету заказов</h4>}
                onChangePage={() => {

                }}
                subHeader
                theme="dark-giq"
                onSort={(c, dir) => console.log(c + ' ' + dir) }
              /> : <Skeleton height={35} count={10}/>
            }
          </CardBody>
        </SkeletonTheme>
      </Card>
    )
  }
}

export default DataTableOrders
