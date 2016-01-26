/**
 * gulp livereload 테스트를 위해 index.html을 뛰우기 위한 웹서버 
 */
var express = require('express')
  , app = express();

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/');
app.set('view engine', 'html'); 

app.get('/', function(req, res) {
  res.render('index.html');
});

// static 은 view 선언 다음에 사용
app.use(express.static(__dirname + '/'));

app.listen(85); 
console.log('Server running at http://127.0.0.1:85/');