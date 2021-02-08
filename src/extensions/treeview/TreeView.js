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
import { styleLight, styleDark } from "./Styles"
import avatarImg from "../../assets/img/portrait/small/avatar-s-11.jpg"

const Loading = props => {
  return (
    <div style={props.style.wrapper}>
      <Spinner size="sm" color="primary" style={props.style.arrow} />
    </div>
  )
}

const data = []
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
        let tree = this.getReferrals(res.tree)

        this.setState({data: tree})
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
    this.setState(() => ({ cursor: node, data }))
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

  getReferrals (data) {
    let referrals = [],
      childrenReferral = ({ depth, refer_id, referral_id }) => {
        console.log(referral_id)

        return []
      }

    if(data.length) {
      data.forEach((item, i) => {
        let currentUser = item.data
        let children = childrenReferral(item)

        // УРОВЕН 1 дерева
        if (item.depth === 1) {
          referrals.push({
            name: currentUser.firstName + ' ' + currentUser.lastName,
            avatar: currentUser.avatar,
            id: currentUser.id,
            children
          })
        }
      })
    }

    return referrals
  }

  render() {
    const { data, cursor } = this.state
    decorators.Loading = Loading

    if(!data.length) return ''

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

                    {data.map((item, i) => {
                      let avatarSrc = item.avatar ?
                        `http://cabinet.giq-group.com/back/storage/app/${item.avatar}`
                      : avatarImg

                      decorators.Header =  ({ node, style, prefix, url }) =>
                        <div style={style.base}>
                          <div style={{ ...style.title, display: "flex" }}>
                            <img className="mr-1 rounded-circle" src={avatarSrc} width="32" height="32" /> {`${node.name}`}
                          </div>
                        </div>;

                      return <Treebeard
                        key={i}
                        data={item}
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
                    })}
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
