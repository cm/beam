const { h, render, Component } = require('preact')
const config = require('../config')
const Home = require('./home')
const Player = require('./player')

/**
 * App component, handles app state.
 */
class App extends Component {
  constructor() {
    super()
    this.state = {
      stream: null
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onBackButton = this.onBackButton.bind(this)
  }

  onSubmit(link) {
    this.setState({ stream: link })
  }

  onBackButton() {
    this.setState({ stream: null })
  }

  render() {
    if (this.state.stream === null) {
      return h(Home, { onSubmit: this.onSubmit })
    } else {
      return h(Player, { stream: this.state.stream, onBackButton: this.onBackButton })
    }
  }
}

/**
 * Render application.
 */
render(h(App), document.getElementById('root'))
