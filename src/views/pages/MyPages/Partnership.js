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
                <p>Last updated on 10 Dec 2018</p>
              </CardHeader>
              <CardBody>
                <p>
                It has been said that astronomy is a humbling and character-building experience. 
                There is perhaps no better demonstration of the folly of human conceits than this 
                distant image of our tiny world. To me, it underscores our responsibility to deal 
                more kindly with one another, and to preserve and cherish the pale blue dot, the 
                only home we’ve ever known. The Earth is a very small stage in a vast cosmic arena. 
                Think of the rivers of blood spilled by all those generals and emperors so that, 
                in glory and triumph, they could become the momentary masters of a fraction of a 
                dot. Think of the endless cruelties visited by the inhabitants of one corner of 
                this pixel on the scarcely distinguishable inhabitants of some other corner, how 
                frequent their misunderstandings, how eager they are to kill one another, how 
                fervent their hatreds.
                </p>
                <img
                  src={img1}
                  alt="article img"
                  className="img-fluid rounded-sm mb-1 w-100"
                />
                <p>
                  Candy canes oat cake biscuit halvah ice cream. Marshmallow
                  icing topping toffee caramels dessert carrot cake. Liquorice
                  soufflé brownie sugar plum dessert cotton candy. Cupcake
                  halvah topping oat cake soufflé pastry dragée pudding cotton
                  candy.
                </p>
                <h5 className="mb-1">Topics:</h5>
                <ul className="article-question p-0 list-unstyled">
                  <li>
                    <ChevronsRight size={16} />
                    <span className="align-middle">
                      Pastry jelly chocolate bar caramels
                    </span>
                  </li>
                  <li>
                    <ChevronsRight size={16} />
                    <span className="align-middle">
                      Donut chupa chups oat cake
                    </span>
                  </li>
                  <li>
                    <ChevronsRight size={16} />
                    <span className="align-middle">
                      Marshmallow icing topping toffee caramels dessert carrot
                      cake
                    </span>
                  </li>
                </ul>
                <p className="mt-2">
                  Chocolate cake powder I love jelly beans lemon drops candy
                  fruitcake. Sesame snaps sugar plum chocolate candy canes
                  muffin. Wafer pastry topping croissant pudding dessert I love.
                  Bonbon apple pie fruitcake candy canes I love. Lollipop sweet
                  gingerbread I love I love dessert. I love halvah marshmallow
                  pie jelly beans macaroon candy. Bonbon ice cream lollipop pie
                  fruitcake oat cake. Topping marshmallow I love sesame snaps
                  dragée. I love sesame snaps jelly. Chocolate sesame snaps
                  jelly I love I love powder jelly-o.
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
export default Partnership
