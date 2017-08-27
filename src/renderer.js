const { h, render, Component } = require('preact')
const WebTorrent = require('webtorrent')
const config = require('./config')

/**
 * Create a torrent client.
 */
const client = new WebTorrent(config.wt.client)

class Main extends Component {
  constructor() {
    super()
  }

  onTorrent(link) {
    this.props.onTorrent(link)
  }

  render() {
    return h('div', { id: 'drop_box' },
      h('div', { id: 'border' },
        h('span', { id: 'drop_text' }, 'Drop Magnet or .torrent')
      )
    )
  }
}

/**
 * Screen component.
 */
class Screen extends Component {
  constructor() {
    super()
  }

  render() {
    return null
  }
}

/**
 * App component.
 */
class App extends Component {
  constructor() {
    super()
    this.state = {
      stream: null
    }
  }

  onTorrent(link) {
    this.setState({ stream: link })
  }

  onBackButton() {
    this.setState({ stream: null })
  }

  render() {
    if (this.state.stream == null) {
      return h(Main, { onTorrent: this.onTorrent })
    } else {
      return h(Screen, { infoHash: this.state.stream.info_hash, onBackButton: this.onBackButton })
    }
  }
}

/**
 * Render application.
 */
render(h(App), document.getElementById('root'))
