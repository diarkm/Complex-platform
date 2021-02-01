import React from "react"
import * as Icon from "react-feather"
const navigationConfig = [
  {
    id: "dashboard",
    title: "Консоль",
    type: "collapse",
    icon: <Icon.Home size={20} />,
    children: [
      {
        id: "analyticsDash",
        title: "Аналитика",
        type: "item",
        icon: <Icon.Circle size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/dashboard"
      },
      {
        id: "buyPackages",
        title: "Пополнить счет",
        type: "item",
        icon: <Icon.ShoppingCart size={12} />,
        permissions: ["admin", "editor"],
        navLink: "/buyPackages"
      }
    ]
  },
  {
    type: "groupHeader",
    groupTitle: "Моя система"
  },
  {
    id: "charts",
    title: "Отчеты",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/reports"
  },
  {
    id: "referrals",
    title: "Рефералы",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/referrals",
  },
  {
    id: "wallet",
    title: "Кошелек",
    type: "item",
    icon: <Icon.CreditCard size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/wallet",
  },
  {
    id: "cart",
    title: "Мои заказы",
    type: "item",
    icon: <Icon.ShoppingCart size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/cart"
  },
  {
    id: "partner",
    title: "Партнерская программа",
    type: "item",
    icon: <Icon.FileText size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/partner"
  },
  {
    id: "settings",
    title: "Настройки",
    type: "item",
    icon: <Icon.User size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/settings"
  }
  /*{
    id: "quit",
    title: "Выход",
    type: "item",
    icon: <Icon.Power size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/quit"
  }*/
]

export default navigationConfig
