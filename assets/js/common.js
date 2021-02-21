const User = localStorage.getItem('user');
console.log(User)
const WebTopHeader = document.getElementById('web-details');
WebTopHeader.innerHTML += `
                <div class="col-6">

                <span class="border border-start-0 border-top-0 border-bottom-0 px-2">
                    <i class="fas fa-headset text-warning"></i>&nbsp;&nbsp;+919-(444)-1234567
                </span>
                <span class="ms-2">
                    <i class="far fa-envelope text-warning"></i> &nbsp;&nbsp; support@flynbuy.com
                </span>


                </div>
                <div class="col-6">
                <!-- 
                    float-end = move content to right side
                -->
                ${User == null ? `<span class="px-2 float-end">
                <i class="far fa-clock text-warning"></i>&nbsp; Login
            </span>` : ''}
                
                <span class="border border-start-0 border-top-0 border-bottom-0 px-2 float-end">
                    <i class="far fa-clock text-warning"></i>&nbsp; Daily deal
                </span>
                <span class="border border-start-0 border-top-0 border-bottom-0 px-2  float-end location">
                    <i class="far fa-compass text-warning"></i> &nbsp; Store location
                </span>

                </div>
`