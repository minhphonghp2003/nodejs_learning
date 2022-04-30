import jwt from 'jsonwebtoken'
// var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.hqWGSaFpvbrXkOWc6lrnffhNWR19W_S1YKFBx2arWBk'
// console.log(token);



let data = jwt.sign({data:"data"}, 'secret')

console.log(data);
jwt.verify(token, 'secret',(err,payload)=>{
    if (err) {
        console.log(err);
    }else{
        console.log(payload);
    }
})
