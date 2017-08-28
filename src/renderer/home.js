const { h, Component } = require('preact')
const config = require('../config')

/**
 * Main component, shown on app load.
 */
module.exports = class Home extends Component {
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