const { h, Component } = require('preact')
const WebTorrent = require('webtorrent')
const config = require('../config')

/**
 * Create a torrent client.
 */
const client = new WebTorrent(config.webtorrent.client)

/**
 * Screen component, shows video stream.
 */
module.exports = class Player extends Component {
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

  handleBackButton() {
    this.destroyStream()
    this.props.onBackButton()
  }

  render() {
    this.startStream(this.props.stream)
    if (this.state.ready === false) {
      return h('p', null, 'Loading...')
    } else {
      return h('div', { id: 'player' },
        h('video', { id: 'video', controls: true },
          h('source', { src: this.state.url })
        ),
        h('div', { id: 'overlay' })
      )
    }
  }
}
