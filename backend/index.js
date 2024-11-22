const express = require('express')
const path = require('path')
//노드 설치시 기본적으로 같이 다운됨

const app = express()
const port = 3000
app.use(express.static('public'))
//퍼블릭 개방된
app.get('/', (req, res) => {
  // res.send('<h1>Hello World!</h1>')
  res.sendFile(path.join(__dirname, "notice.html"))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})