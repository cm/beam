const { h, Component } = require('preact')
const WebTorrent = require('webtorrent')
const config = require('../config')

/**
 * Create a torrent client.
 */
const client = new WebTorrent(config.webtorrent.client)

/**
 * Screen component, handles torrent client, controls and video.
 */
module.exports = class Player extends Component {
  constructor() {
    super()
    this.state = {
      ready: false
    }
    this.server = null
    this.torrent = null
    this.video = null
  }

  /**
   * Load the stream after render is complete. (very hacky feeling)
   */
  componentDidMount() {
    this.video = document.getElementById('video')
    if (this.state.ready !== true) {
      this.torrent = client.add(this.props.stream)
      this.torrent.once('ready', () => {
        this.server = this.torrent.createServer()
        this.server.listen(0, () => {
          let port = this.server.address().port
          let url = `http://127.0.0.1:${port}/0`
          this.setState({
            ready: true
          })
          // Control video without changing state
          this.video.src = url
          this.video.load()
          this.video.play()
        })
      })
    }
  }

  handleBackButton() {
    this.server.destroy()
    this.torrent.destroy()
    this.server = null
    this.torrent = null
    this.props.onBackButton()
  }

  handleControls() {
    // to do
  }

  render() {
    return h('div', { id: 'player' },
      h('video', { id: 'video', controls: false }),
      h(Controls)
    )
  }
}

class Controls extends Component {
  constructor() {
    super()
  }

  render() {
    return null
  }
}