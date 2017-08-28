const { h, render, Component } = require('preact')
const WebTorrent = require('webtorrent')
const config = require('./config')

/**
 * Create a torrent client.
 */
const client = new WebTorrent(config.webtorrent.client)

/**
 * Main component, shown on app load.
 */
class Main extends Component {
  constructor() {
    super()
    this.state = {
      link: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({ link: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit(this.state.link)
  }

  render() {
    return h('div', { id: 'link-box' },
      h('p', null, 'Enter a magnet link or drop a .torrent file:'),
      h('form', { onSubmit: this.handleSubmit },
        h('input', { id: 'link', value: this.state.link, onChange: this.handleChange, autoFocus: true }),
        h('input', { id: 'submit-button', type: 'button', value: 'Open', onClick: this.handleSubmit })
      )
    )
  }
}

/**
 * Screen component, shows video stream.
 */
class Screen extends Component {
  constructor() {
    super()
    this.state = {
      ready: false,
      url: null
    }
    this.server = null
    this.torrent = null
  }

  startStream(stream) {
    if (this.state.ready !== true) {
      this.torrent = client.add(stream)
      this.torrent.once('ready', () => {
        this.server = this.torrent.createServer()
        this.server.listen(0, () => {
          let port = this.server.address().port
          let url = `http://127.0.0.1:${port}/0`
          this.setState({
            ready: true,
            url: url
          })
        })
      })
    }
  }

  destroyStream() {
    this.server.destroy()
    this.torrent.destroy()
    this.server = null
    this.torrent = null
  }

  render() {
    this.startStream(this.props.stream)
    if (this.state.ready === false) {
      return h('p', null, 'Loading...')
    } else {
      return h('video', { id: 'video', controls: true },
        h('source', { src: this.state.url })
      )
    }
  }
}

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
      return h(Main, { onSubmit: this.onSubmit })
    } else {
      return h(Screen, { stream: this.state.stream, onBackButton: this.onBackButton })
    }
  }
}

/**
 * Render application.
 */
render(h(App), document.getElementById('root'))
