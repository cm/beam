/**
 * Pirate Bay proxy.
 */
exports.proxy = 'https://pirateproxy.cam'

/**
 * WebTorrent config.
 */
exports.wt = {
  client: {
    maxConns: 55,   // Max number of connections per torrent (default=55)
    tracker: true,  // Enable trackers (default=true), or options object for Tracker
    dht: true,      // Enable DHT (default=true), or options object for DHT
    webSeeds: true  // Enable BEP19 web seeds (default=true)
  },
  torrent: {
    maxWebConns: 4, // Max number of simultaneous connections per web seed [default=4]
  }
}
