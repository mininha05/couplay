const express = require('express')
const { type } = require('os')
const path = require('path')
//노드 설치시 기본적으로 같이 다운됨

const app = express()
const port = 3000
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
app.use(express.static('public'))
//퍼블릭 개방된
const users = []; //컴퓨터 메모리에, 배열(Array)이라는 객채 형태의 자료형 (=저장공간)
app.use(express.json()); //요청 body룰 express가 처리(=이해)
app.use(express.urlencoded({extended: true}))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "notice.html"))
})
app.post('/signup', (req, res) => {
  const {user_gubun, user_id, user_pwd, user_name, user_ph, user_email, user_sms, user_file} = req.body;
  bcrypt.hash(user_pwd, saltRounds, function(err, hash) {
    // Store hash in your password DB. : 해상된 암호(hash)를 DB에
  // console.log("처음 입력한 암호:", user_pwd)
  
  // console.log("회원 구분: ",user_gubun);
  users.push({
    type: user_gubun ? "개인": "사업자",
    id: user_id,
    pwd: hash,
    name: user_name,
    phone: user_ph,
    email: user_email,
    sms: user_sms ? "Y": "N",
    file: user_file
  });
  console.log(users);
  console.log("해싱처리된 암호:", hash)
});
  // console.log("아이디 :", user_id); 
  // console.log("비밀번호 :", user_pwd); 
  // console.log("이름 :", user_name); 
  // console.log("연락처 :", user_ph); 
  // console.log("sms 수신여부 :", user_sms); 
  // console.log("이메일 :", user_email); 
  // console.log("파일 :", user_file); 
  res.send('회원가입 성공!')
})
app.get('/signin', (req, res) => {
  res.send('signin 화면을 보고 계십니다.');

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})