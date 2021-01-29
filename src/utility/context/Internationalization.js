import React from "react"
import { IntlProvider } from "react-intl"

import messages_en from "../../assets/data/locales/en.json"
import messages_ru from "../../assets/data/locales/ru.json"

const menu_messages = {
  en: messages_en,
  ru: messages_ru,
}

const Context = React.createContext()

class IntlProviderWrapper extends React.Component {
  state = {
    locale: "ru",
    messages: menu_messages["ru"]
  }

  render() {
    const { children } = this.props
    const { locale, messages } = this.state
    return (
      <Context.Provider
        value={{
          state: this.state,
          switchLanguage: language => {
            this.setState({
              locale: language,
              messages: menu_messages[language]
            })
          }
        }}
      >
        <IntlProvider
          key={locale}
          locale={locale}
          messages={messages}
          defaultLocale="ru"
        >
          {children}
        </IntlProvider>
      </Context.Provider>
    )
  }
}

export { IntlProviderWrapper, Context as IntlContext }
