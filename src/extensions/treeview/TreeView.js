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
import avatarImg from "../../assets/img/portrait/small/avatar_none.jpeg"

const Loading = props => {
  return (
    <div style={props.style.wrapper}>
      <Spinner size="sm" color="primary" style={props.style.arrow} />
    </div>
  )
}

const data = []/*{
  name: 'John Doe',
  children: [
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
}*/

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
      showUser = (currentItem, children) => {
        return {
          name: currentItem.depth+':'+currentItem.data.firstName + ' ' + currentItem.data.lastName,
          avatar: currentItem.data.avatar,
          id: currentItem.data.id,
          children
        }
      },
      /**
       * refer_id - тот, кто пригласил (Пригласивший)
       * referral_id - тот, кто принял приглашение (Реферал)
       */
      childrenReferral = ($item) => {
        let $tree = []

        $tree = data.filter(item => item.refer_id === $item.referral_id).map(item => {
          return showUser(item, childrenReferral(item))
        })

        return $tree
      }

    if(data.length) {
      data.forEach((item, i) => {
        let children = childrenReferral(item)

        // УРОВЕНЬ 1
        if(item.depth === 1) {
          referrals.push(showUser(item, children))
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
