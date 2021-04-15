import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from "reactstrap"
import "../../../assets/scss/pages/knowledge-base.scss"
import { FormattedMessage } from "react-intl";
class Partnership extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col lg="12" md="12" sm="12">
            <Card>
              <CardHeader>
                <h1><FormattedMessage id="Партнерская программа"/></h1>
              </CardHeader>
              <CardBody>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-S</h5>
                  <p><FormattedMessage id="Личный взнос"/> 500$<br/>
                  <FormattedMessage id="Лично приглашенных"/> 5 <FormattedMessage id="рефералов по"/> 500$.<br/>
                  <FormattedMessage id="Товарооборот"/> 25000$<br/>
                  <FormattedMessage id="Бонус"/> 500$
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-G</h5>
                  <p><FormattedMessage id="Личный взнос"/> 1000$<br/>
                  <FormattedMessage id="Лично приглашенных"/> 10 <FormattedMessage id="рефералов по"/> 500$<br/>
                  <FormattedMessage id="Товарооборот"/> 50000$<br/>
                  <FormattedMessage id="Бонус"/> 1000$
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-D</h5>
                  <p><FormattedMessage id="Личный взнос"/> 3000$<br/>
                  <FormattedMessage id="Лично приглашенных"/> 12 <FormattedMessage id="рефералов по"/> 1000$.<br/>
                  <FormattedMessage id="Товарооборот"/> 100000$<br/>
                  <FormattedMessage id="Бонус"/> 2500$
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-R</h5>
                  <p><FormattedMessage id="Личный взнос"/> 5000$<br/>
                  <FormattedMessage id="Лично приглашенных"/> 15 <FormattedMessage id="рефералов по"/> 1000$<br/>
                  <FormattedMessage id="Товарооборот"/> 200000$<br/>
                  <FormattedMessage id="Бонус"/> 5000$
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-N</h5>
                  <p><FormattedMessage id="Личный взнос"/> 10000$<br/>
                  <FormattedMessage id="Лично приглашенных"/> 20 <FormattedMessage id="рефералов по"/> 1000$<br/>
                  <FormattedMessage id="Товарооборот"/> 300000$<br/>
                  <FormattedMessage id="Бонус"/> 10000$
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-M</h5>
                  <p><FormattedMessage id="Личный взнос"/> 25000$<br/>
                  <FormattedMessage id="Лично приглашенных"/> 25 <FormattedMessage id="рефералов по"/> 1000$<br/>
                  <FormattedMessage id="Товарооборот"/> 500000$<br/>
                  <FormattedMessage id="Бонус"/> 20000$ 
                  </p>
                </div>
                <div className='mb-2'>
                  <h5>INVESTOR GIQ-T</h5>
                  <p><FormattedMessage id="Личный взнос"/> 30000$<br/>
                  <FormattedMessage id="Лично приглашенных"/> 30 <FormattedMessage id="рефералов по"/> 1000$<br/>
                  <FormattedMessage id="Товарооборот"/> 1000000$<br/>
                  <FormattedMessage id="Бонус"/> 50000$
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
