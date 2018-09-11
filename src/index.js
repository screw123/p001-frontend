import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'moment/locale/zh-hk'

//import registerServiceWorker from './registerServiceWorker'
console.time('wholeapp')
ReactDOM.render(<App />, document.getElementById('root'))
console.timeEnd('wholeapp')
//registerServiceWorker();
