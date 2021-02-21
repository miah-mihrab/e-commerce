let _User = localStorage.getItem("user");

if (_User === null) {
    alert('You are not logged in');
    window.location = "index.html"
} else {
    _User = JSON.parse(_User);
    console.log(_User.token)
    const Form = document.querySelector('form');
    async function fetchUser () {
    let response = await fetch('http://localhost:3000/api/v1/user/'+_User._id, {
        method: 'GET', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + _User.token
        }
      })
    let resp = await response.json()
    Form[0].value = resp.body.fname
    Form[1].value = resp.body.lname
    Form[2].value = resp.body.email
    Form[3].value = resp.body.city
    Form[4].value = resp.body.address
    Form[5].value = resp.body.zip
    }
    fetchUser()
 
}

async function updateBasic () {
    const Form = document.querySelector('form');
    let values = [];

    for (let i=0; i<Form.length; i++) {
        values.push(Form[i].value)
    }
    let [fname, lname, email, city, address, zip] = values;
    console.log(fname, lname)

    let user = {
        fname, lname, email, city, address, zip
    }
    let response = await fetch('http://localhost:3000/api/v1/user/update/'+_User._id, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + _User.token
        },
        body: JSON.stringify({...user})
      });

      console.log(await response.json())
}


let subBtns = document.querySelectorAll('.submit-btn');
for(let i=0 ; i<subBtns.length; i++) {
    subBtns[i].addEventListener('click', e => {
        e.preventDefault()
    })
}