import '../src/panel.test.js'

var testsContext = require.context('../src', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
