'use strict'
module.exports = function() { // eslint-disable-line func-names
  // Global variables
  const gulp = this.gulp
  const plugins = this.opts.plugins
  const config = this.opts.configs
  const themes = plugins.getThemes()
  const streams = plugins.mergeStream()

  // Generate all necessary symlinks before transpilation, but only if not a part of tasks pipeline
  if (!plugins.util.env.pipeline) {
    plugins.runSequence('inheritance')
  }

  // Loop through themes to compile scss or less depending on your config.json
  themes.forEach(name => {
    streams.add(require('../helper/babel')(gulp, plugins, config, name))
  })

  return streams
}
