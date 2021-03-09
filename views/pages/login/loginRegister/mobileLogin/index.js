
function setUser(UserInfo) {
      localStorage.setItem('user',UserInfo)
}
var file = document.getElementById('file')
var image = document.getElementById('img')
file.onchange = function() {
let fileDate = this.files[0]
let reader = new FileReader()
reader.readAsDataURL(fileDate)
  reader.onload = function () {
  image.setAttribute('src', this.result)
  }
}
function show(){
  let number = document.getElementsByTagName('input')[0].value
  if((/^1[3456789]\d{9}$/.test(number))){
      let UserInfo = {
        Phone:'',
        Url:''
      }
      var file = document.getElementById('file')
      var image = document.getElementById('img')
      file.onchange = function() {
      let fileDate = this.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(fileDate)
        reader.onload = function () {
        image.setAttribute('src', this.result)
        }
      }
      UserInfo.url = image.src
      setUser(JSON.stringify(UserInfo))
      UserInfo.Phone = number
      setUser(JSON.stringify(UserInfo))
      let a = document.getElementById('push')
      a.href = 'javascript:'
      console.log(location.href);
      let PushUrl = 'http://localhost:8080/users/'+'?'+'phone='+number
      console.log(PushUrl);
      window.location.href = PushUrl
  }else{
    alert('手机号格式不正确')
    let a = document.getElementById('push')
    a.href = 'javascript:'
    let PushUrl = 'http://localhost:8080/users/'+'?'+'phone='+number
    console.log(PushUrl);
    window.location.href = PushUrl
  }
}



