import React, { useState } from "react"
import { Card, CardBody, Progress, Button } from "reactstrap"
import { ChevronsRight } from "react-feather"
import { history } from "../../../../history"

import UserDataService from "../../../../api/user-data-service";

const FundsWallet = () => {
  const [balance, setbalance] = useState(0)
  const [deposits, setdeposits] = useState([])

  let UserAPI = new UserDataService()

  // Баланс
  if (balance === 0) {
    UserAPI.getUserData()
      .then(response => {
        setbalance(response.user.balance)
      })
  }

  // Депозиты
  if(!deposits.length) {
    UserAPI.getDeposits()
      .then(response => {
        console.log(response)
      })
  }

  return (
    <Card>
      <CardBody>
        <h1 className="mb-0">
          <sup className="font-medium-3 mr-50">$</sup>
          {balance}
        </h1>
        <small>
          <span className="text-muted">Мой кошелек: </span>${balance}
        </small>
        <h5 className="mt-1">
          <span className="text-success">+5.2% ($956)</span>
        </h5>
        <Button.Ripple
          block
          color="primary"
          className="w-100 box-shadow-1 mt-2"
          onClick={() => history.push("/buyPackages")}
        >
          Пополнить счет <ChevronsRight size={15} />
        </Button.Ripple>
        <hr className="my-2" />
        <small>Заработано: $56,156</small>
        <Progress className="mt-1 mb-2" color="success" value="100" />

        <small>В заморозке: $16,156</small>
        <Progress className="mt-1" color="warning" value="25" />
        <hr className="my-2" />
        <h2>Мои депозиты</h2>
        <div>
          <hr className="my-1" />
          <div className="d-flex justify-content-between">
            <small>Сумма</small>
            <small>Срок депозита</small>
          </div>
          <hr className="my-1" />
          <div className="d-flex justify-content-between">
            <p className="text-success">$800</p>
            <p>23/12/2021</p>
          </div>
          <hr className=" mt-0 mb-1" />
          <div className="d-flex justify-content-between">
            <p className="text-success">$2000</p>
            <p>02/01/2022</p>
          </div>
          <hr className="my-0" />
        </div>
      </CardBody>
    </Card>
  )
}

export default FundsWallet
