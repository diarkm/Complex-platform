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
import * as filters from "./Filter"
import { data } from "./Data"
import { styleLight, styleDark } from "./Styles"
const Loading = props => {
  return (
    <div style={props.style.wrapper}>
      <Spinner size="sm" color="primary" style={props.style.arrow} />
    </div>
  )
}

class TreeView extends React.Component {
  state = {
    data
  }

  componentDidMount() {
    Prism.highlightAll()
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
                      data={data}
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
