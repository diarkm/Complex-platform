import React from "react"
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Spinner
} from "reactstrap"
import { Treebeard, decorators } from "react-treebeard"
import Prism from "prismjs"
import { connect } from "react-redux"
import UserDataService from "../../api/user-data-service";
import * as filters from "./Filter"
import avatarImg from "../../assets/img/portrait/small/avatar-s-11.jpg"
import { styleLight, styleDark } from "./Styles"
const Loading = props => {
  return (
    <div style={props.style.wrapper}>
      <Spinner size="sm" color="primary" style={props.style.arrow} />
    </div>
  )
}

const CustomHeader = ({ node, style, prefix }) =>
  <div style={style.base}>
    <div style={{ ...style.title, display: "flex" }}>
      <img className="mr-1 rounded-circle" src={avatarImg} width="32" height="32"></img> {`${node.name}`}
    </div>
  </div>;

const data = {
  name: 'John Doe',
  children: [
      {
          name: 'Diana Doe',
          children: [
              { name: 'Adam Smith' },
              { name: 'Ariana Bloomberg' }
          ]
      },
      {
          name: 'Max Marchenko',
          children: [
            { name: 'Anna Smith' },
            { name: 'Sam Polsen' }
          ]
      },
      {
          name: 'Diar Kundakbaev',
          children: [
              {
                  name: 'Rustem Kozhabayev',
                  children: [
                      { name: 'Daulet Ersainov' },
                      { name: 'Richard Winston' }
                  ]
              }
          ]
      }
  ]
}

class TreeView extends React.Component {
  state={
    data
  }

  constructor(props) {
    super(props)
    this.userDataService = new UserDataService()
  }

  componentDidMount() {
    this.getReferralTree();
    Prism.highlightAll()
  }

  async getReferralTree() {
    this.userDataService.getReferralTree()
      .then(res => {
        console.log('OK', res.tree)
        this.setState({data: res.tree})
      })
      .catch(err => console.log(err))
  }

  onToggle = (node, toggled) => {
    const { cursor, data } = this.state

    if (cursor) {
      this.setState(() => ({ cursor, active: false }))
    }

    node.active = !node.active
    if (node.children) {
      node.toggled = toggled
    }
    this.setState(() => ({ cursor: node, data: Object.assign({}, data) }))
  }

  onFilterMouseUp = ({ target: { value } }) => {
    const filter = value.trim()
    if (!filter) {
      return this.setState(() => ({ data }))
    }
    let filtered = filters.filterTree(data, filter)
    filtered = filters.expandFilteredNodes(filtered, filter)
    this.setState(() => ({ data: filtered }))
  }

  render() {
    const { data, cursor } = this.state
    decorators.Loading = Loading
    decorators.Header = CustomHeader

    return (
      <React.Fragment>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <CardTitle>Структура сети</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <input
                      type="text"
                      placeholder="Поиск..."
                      className="form-control mb-1"
                      onKeyUp={this.onFilterMouseUp}
                    />
                    <Treebeard
                      data={data ? data : ''}
                      onToggle={this.onToggle}
                      style={
                        this.props.theme === "light" ||
                        this.props.theme === "semi-dark"
                          ? styleLight
                          : styleDark
                      }
                      decorators={decorators}
                      animations={false}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.customizer.customizer.theme
  }
}

export default connect(mapStateToProps)(TreeView)
