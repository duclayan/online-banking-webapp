//Var Stuff
// Get the modal
var modal = document.getElementById("myModal");
var rcv = document.getElementById('receiver');
var input = document.getElementById('amount')
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

class bankUser {
    constructor(username,balance,id,password){
        this.username = username;
        this.password = password;
        this.balance = balance;
        this.index = id; 
        this.image = ''
    };

    appendAccount(action,amount){
            // console.log(`InputAmount = ${inputAmount} Current User Balance = ${currentUser.balance}`)
            // currentUser.balance = parseFloat(currentUser.balance) + parseFloat(inputAmount)
            // console.log(currentUser.balance)
        console.log(action)
        this.balance = (action === 'deposit') ? this.balance+=amount : this.balance-=amount;
        return this.balance;
    };

    checkExisting(username){
    
        for (let i = 1; i < user.length; i++){
            if (username === user[i].username){
                console.log('userFound')
                return i
            } 
        }
        return false
    }

    isValidPassword(pass1,pass2){
        return (pass1 == pass2) ? true : false;
    }

    isValidSignUp(pass1,pass2){         //returns error messages
        let outputMessage = ''
        if (this.checkExisting() !== false && this.isValidPassword(pass1,pass2 === false)) {
            outputMessage ='ERROR: Existing Username and Unmatching Password'
            return outputMessage
        } else if (this.checkExisting() !== false) {
            outputMessage = 'ERROR: Username already exist'
            return outputMessage
        } else if (this.isValidPassword(pass1,pass2) === false){
            outputMessage = 'ERROR: Password does not match'
            return outputMessage
        } else {
            return false
        }
    }

    transferMoney(amount,recepient){

        let i = this.checkExisting(recepient)
        var isEnoughBalance = (this.amount > amount) ? true : false;
        console.log(isEnoughBalance)
        if (i !== false && isEnoughBalance === true) {
            user[i].balance += amount
            this.balance -= amount
        }else if (i === false && isEnoughBalance ===false) {
            document.getElementById('modal-status').innerHTML = "Insufficient Balance and Invalid User"
        } else if (i === false) {
            document.getElementById('modal-status').innerHTML = "User does not exist"
        } else if ( isEnoughBalance === false) {
            document.getElementById('modal-status').innerHTML = "Insufficient Balance"
        } 
    }

    displayItems(stat){
        document.getElementById('input-container').style.display = `${stat}`;
        document.getElementById('modal-title').style.display = `${stat}`;
    }

    addUser(image) {
    let list = document.getElementById('output-list')
    this.image = image
    let newHTML = 
    `<li> 
    <img src = '${this.image}' height = "40px" width = "40px">
    <a> ${this.username} </a>
    <a class = user-balance> ${this.balance} </a>
    </li>`
    list.insertAdjacentHTML('beforeend',newHTML)
    }

}


// input username

var user = [];
var currentUser = '';
var previousAction = '';
user[1] = new bankUser ('Merry',20,1,'0123')
currentUser = user[1]
// When the user clicks the button, open the modal 
document.onclick = function(event) {

    var recevier = rcv.value
    current= event.target  
    var action = ""
    var stat = true
    var showpage = ""
    let moneyDisplay = document.getElementById('current-money')

    action = (current.id === '') ? current.parentElement.id : current.id 
    if (current.id === 'modal-title') {action = 'submit'}
    console.log(action)
    document.getElementById('first-page').style.display = 'none'

    switch (action) {
        case 'sign-in-button':
            showpage= 'sign-in-page'
            break;
        case 'crt-acc-button':
            showpage= 'sign-up-page'
            break;
        case 'user-sign-in':
            var username = document.getElementById('username').value;
            var pass1 = document.getElementById('pass').value;
            console.log(`username: ${username} password: ${pass1}`)
            console.log(`this is the username : ${username}`)
            let userCheck = currentUser.checkExisting(username)
            console.log(`this is the current user: ${userCheck}`)
            console.log(user[userCheck])
            if (userCheck !== false && user[userCheck].password === pass1) {

                currentUser = user[userCheck]
                showpage = 'close'
            } 
            break;
        case 'user-sign-up':
            // INPUT username, password, and password verification
            var username = document.getElementById('sign-up-username').value;
            var pass1 = document.getElementById('password').value;
            var pass2 = document.getElementById('conf-password').value;
            // var image = document.getAnimations('image').value;
            // console.log(`this is the image ${image}`)
            // INSTANTIATE newUser
            id = user.length
            user.push(username)
            user[id] = new bankUser(username, 0,id);

            
            // VALIDATION CHECK: Password Match & Existinguser
            if (user[id].isValidSignUp(pass1,pass2) === false) {
                currentUser = user[id];
                currentUser.password = pass1
                showpage = 'close';
            } else {
                var currentDisplay = document.getElementById('sign-up-display');        // takes current display div

                currentDisplay.style.display = 'block';
                currentDisplay.innerHTML = user[id].isValidSignUp(pass1,pass2);
                user.pop(); 
            };
            //ADDING IMAGE
            let list = document.getElementById('output-list')
            this.image = image
            let newHTML = 
            `<li> 
            <img src = '${this.image}' height = "40px" width = "40px">
            <a> ${this.username} </a>
            <a class = user-balance> ${this.balance} </a>
            </li>`
            list.insertAdjacentHTML('beforeend',newHTML)
            
            console.log(currentUser.image)
            break;
        case 'deposit':
            // Get curent amount
            break;
        case 'withdraw':
            break;
        case 'send-money':
            rcv.style.display = "block"
            break;
        case 'get-balance':
            currentUser.displayItems('none')
            document.getElementById("modal-amount").innerHTML = "100.00"

            break;
        case 'submit':
            let inputAmount = parseFloat(document.getElementById('amount').value);
            let recepient = document.getElementById('receiver').value;

            if (previousAction === 'withdraw' || previousAction === 'deposit'){
                currentUser.appendAccount(previousAction,inputAmount);
            } else if (previousAction === 'send-money'){
                currentUser.transferMoney(inputAmount,recepient)
            }

            moneyDisplay.innerHTML = currentUser.balance +'.00'
            break;
        case 'user-list':
            showpage = 'user-list'
            break;
        case 'signIn':
            showpage = 'first-page'
            break;
        default :
            stat = false
            break;
    }
    console.log(`Showpage: ${showpage}`)
    if (showpage === 'user-list') {
        console.log('User List Should Appear')
        modal.style.display = 'block'
        document.getElementById('modal-content-2').style.display = 'flex';
    } else if (showpage !== 'close' && showpage !== ''){ 
        // display sign-in and sign-up modal
        document.getElementById(`${showpage}`).style.display = 'block';
    } else if(showpage == 'close') {
        // closes sign-in and sign-up modal
        document.getElementById('signIn').style.display = 'none';
    } else {
        ;
        // work with depost,withdraw,get balance, send money
        if (stat === true && showpage === '') {
            console.log('regular display')
            document.getElementById('modal-title').innerHTML = action
            modal.style.display = 'block'
            document.getElementById('modal-content-1').style.display = 'flex';
         } else {
            stat = false;
        }
    }
    
    if (action === "deposit" || action === 'withdraw' || action === 'send-money'){
        previousAction = action;
    }  else {
        console.log(`Saved Previous Action: ${previousAction}`)
    }

    if (event.target.className === 'close') {
        modal.style.display = "none";
        rcv.style.display = "none";
        currentUser.displayItems('block')
        input.value = null
        document.getElementById('modal-content-1').style.display = 'none';
        document.getElementById('modal-content-2').style.display = 'none';
    }
}
document.getElementById('image').addEventListener('change', function() {
    // Converts to data url
    const reader = new FileReader()

    reader.addEventListener('load', () => {
        localStorage.setItem('recent-image', reader.result);
    });

    reader.readAsDataURL(this.files[0]);

    const recentImageDataUrl = localStorage.getItem('recent-image');
    if (recentImageDataUrl) {
        console.log (recentImageDataUrl)
        currentUser.addUser(recentImageDataUrl)
    }
});