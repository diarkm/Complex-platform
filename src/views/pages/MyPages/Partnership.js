import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from "reactstrap"
import { ChevronsRight } from "react-feather"
import img1 from "../../../assets/img/pages/kb-article.jpg"
import "../../../assets/scss/pages/knowledge-base.scss"
class Partnership extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col lg="12" md="12" sm="12">
            <Card>
              <CardHeader>
                <h1>Партнерская программа</h1>
              </CardHeader>
              <CardBody>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-S</h5>
                  <p>Личный взнос 500$<br/>
                  Лично рефералов минимум по 500$ 5 человек в структуре<br/>
                  Товарооборот 25000$<br/>
                  Бонус 500$
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-G</h5>
                  <p>Личный взнос 1000$<br/>
                  Лично приглашенных минимум 10 рефералов по 500$<br/>
                  Товарооборот 50000$<br/>
                  Бонус 1000$
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-D</h5>
                  <p>Личный взнос 3000$<br/>
                  Лично приглашенных 12 рефералов по 1000$.<br/>
                  Товарооборот 100000$<br/>
                  Бонус 2500$
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-R</h5>
                  <p>Личный взнос 5000$<br/>
                  Лично приглашенных 15 рефералов по 1000$<br/>
                  Товарооборот 200000$<br/>
                  Бонус 5000$
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-N</h5>
                  <p>Личный взнос 10000$<br/>
                  Лично приглашенных 20 рефералов по 1000$<br/>
                  Товарооборот 300000$<br/>
                  Бонус 10000$
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-M</h5>
                  <p>Личный взнос 25000$<br/>
                  Лично приглашенных 25 рефералов по 1000$<br/>
                  Товарооборот 500000$<br/>
                  Бонус 20000$ 
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-T</h5>
                  <p>Личный взнос 30000$<br/>
                  Лично приглашенных 30 рефералов по 1000$<br/>
                  Товарооборот 1000000$<br/>
                  Бонус 50000$
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
export default Partnership
