const Form = document.querySelector('form');

Form.addEventListener('submit', async e=> {
    e.preventDefault();
    let values = [];
    for (let i=0; i<e.target.length; i++) {
        values.push(e.target[i].value);
    }
    let [fname, lname, email, contact_number, password, address, city, state, zip] = values;
    
    let user = {
        fname,
        lname,
        email,
        password,
        contact_number,
        address,
        city,
        state,
        zip
    }

    const response = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...user })
    });

    let _user = (await response.json()).body;
    if(_user.token) {
        localStorage.setItem('user', JSON.stringify(_user));
        window.location = "index.html"
    } else {
        //...
    }
    // console.log(_user)
        
})