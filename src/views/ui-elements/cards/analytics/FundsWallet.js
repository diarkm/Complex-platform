import React, { useState } from "react"
import { Card, CardBody, Progress, Button } from "reactstrap"
import { ChevronsRight } from "react-feather"
import { history } from "../../../../history"

import UserDataService from "../../../../api/user-data-service";

const FundsWallet = () => {
  const [balance, setbalance] = useState(0)
  const [deposits, setdeposits] = useState([])
  const [depositsloaded, setdepositsloaded] = useState(false)

  let UserAPI = new UserDataService()

  // Баланс
  if (balance === 0) {
    UserAPI.getUserData()
      .then(response => {
        setbalance(response.balance)
      })
  }

  // Депозиты
  if(!deposits.length && !depositsloaded) {
    UserAPI.getDeposits()
      .then(response => {
        setdeposits(response.deposits.collection)
        setdepositsloaded(true)
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
          <span className="text-success">+0% ($0)</span>
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
        <small>Заработано: ${balance}</small>
        <Progress className="mt-1 mb-2" color="success" value="100" />

        <small>В заморозке: $0</small>
        <Progress className="mt-1" color="warning" value="0" />
        <hr className="my-2" />
        <h2>Мои депозиты</h2>
        <div>
          <hr className="my-1" />
          <div className="d-flex justify-content-between">
            <small>Сумма</small>
            <small>Срок депозита</small>
          </div>
          <hr className="my-1" />
          {deposits.length ? deposits.map((deposit, i) => {

            if(parseInt(deposit.value) <= 0)
              return ''

            return (
              <React.Fragment key={i}>
                <div className="d-flex justify-content-between">
                  <p className="text-success">${deposit.value}</p>
                  <p>{deposit.created_at
                        .match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}</p>
                </div>
                <hr className=" mt-0 mb-1" />
              </React.Fragment>
            )
          }) : ''}
        </div>
      </CardBody>
    </Card>
  )
}

export default FundsWallet
