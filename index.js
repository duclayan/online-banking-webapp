//Var Stuff
// Get the modal
var modal = document.getElementById("myModal");
var rcv = document.getElementById('receiver');
var input = document.getElementById('amount')
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var imageLink =''

class bankUser {
    constructor(username,balance,id,password,image){
        this.username = username;
        this.password = password;
        this.balance = balance;
        this.index = id; 
        this.image = image;
    };

    appendAccount(action,amount){
      
        if (action === 'deposit') {
            this.balance+=amount
        } else if (action === 'withdraw') {
            if (this.balance>amount){
                this.balance-=amount
                } else if (this.balance<=amount){
                    alert('Insufficient Balance')
                }
        }
        return this.balance;
    };

    checkExisting(username){
        
        if (username !== '') {
            for (let i = 1; i < user.length; i++){
                if (username === user[i].username){
                    return i
                } 
            }
            return false
        } else {
            return false
        }
    }

    isValidPassword(pass1,pass2){
        if (pass1 !== '' || pass2 !=='') {
            return (pass1 == pass2) ? true : false;
        } else {
            return false
        }
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
        } else{
            return false
        } 
    }

    transferMoney(amount,recepient){

        let i = this.checkExisting(recepient)
        var isEnoughBalance = (this.balance > amount) ? true : false;

        if (amount != NaN) {
            if (i !== false && isEnoughBalance === true) {
                user[i].balance += amount
                this.balance -= amount
            }else{
                document.getElementById('modal-status').style.display = 'block'
                if  (i === false && isEnoughBalance ===false) {
                    alert("Insufficient Balance and Invalid User")
                } else if (i === false) {
                    alert("User does not exist")
                } else if ( isEnoughBalance === false) {
                    alert("Insufficient Balance") 
                } 
            }
        }
        list.innerHTML =''
        this.updateUserList()
    }

    displayItems(stat){
        document.getElementById('input-container').style.display = `${stat}`;
        document.getElementById('modal-title').style.display = `${stat}`;
        document.getElementById('modal-content-1').style.display = 'none';
        document.getElementById('modal-content-2').style.display = 'none';
        document.getElementById('modal-status').style.display = 'none';
        document.getElementById("modal-amount").style.display = 'none';
        modal.style.display = "none";
        rcv.style.display = "none";
    }

    addUser(imageLink) {
    let list = document.getElementById('output-list')
    this.image = imageLink
    let newHTML = 
    `<li> 
    <img src = '${this.image}' height = "40px" width = "40px">
    <a> ${this.username} </a>
    <a class = user-balance> ${this.balance} </a>
    </li>`
    list.insertAdjacentHTML('beforeend',newHTML)
    }
    updateUserList() {
        // list.innerHTML =''
        for (let i = 1 ; i < user.length; i++){
            console.log(user[i])
            // let image = 'profile-picture.png'
            let newHTML = 
            `<li> 
            <img src = '${user[i].image}' height = "40px" width = "40px">
            <a> ${user[i].username} </a>
            <a class = user-balance> ${user[i].balance} </a>
            </li>`
        
            list.insertAdjacentHTML('beforeend',newHTML)
            console.log('success')
        }
        
    }
}


// input username

var user = [];
var currentUser = '';
var previousAction = '';
user[1] = new bankUser ('Merry', 20, 1, '0123', 'profile-picture.png')
user[2] = new bankUser ('John', 250, 2, '1111', 'profile-picture.png')
user[3] = new bankUser ('Victor', 250, 3, '1111', 'profile-picture.png')
user[4] = new bankUser ('Pau', 250, 4, '1111', 'profile-picture.png')
user[5] = new bankUser ('Analyn', 250, 5, '1111', 'profile-picture.png')

list = document.getElementById('output-list')
// Add all the users to the list 
currentUser = user[1]
// call updateUserList to input existing users
currentUser.updateUserList()


document.onclick = function(event) {
    current= event.target  
    var stat = true
    var showpage = ""
    let moneyDisplay = document.getElementById('current-money')

    var action = (current.id === '') ? current.parentElement.id : current.id 
    if (current.id === 'modal-title') {action = 'submit'}
    document.getElementById('first-page').style.display = 'none'

    switch (action) {
        case 'sign-in-button':
            showpage= 'sign-in-page'
            break;

        case 'crt-acc-button':
            showpage= 'sign-up-page'
            break;

        case 'user-sign-in':

            // get user input: username, password
            var username = document.getElementById('username').value;
            var pass1 = document.getElementById('pass').value;

            //verification check for user
            let userCheck = currentUser.checkExisting(username)

            // check if valid account
            if (userCheck !== false && user[userCheck].password === pass1) {
                currentUser = user[userCheck]
                moneyDisplay.innerHTML = currentUser.balance
                showpage = 'close'
                document.getElementById('header-image').src = currentUser.image

            } else {
                showpage = 'stay'
                alert("Invalid Account")
            }
            
            break;

        case 'user-sign-up':
            // INPUT username, password, and password verification
            var username = document.getElementById('sign-up-username').value;
            var pass1 = document.getElementById('password').value;
            var pass2 = document.getElementById('conf-password').value;

            console.log(`Username: ${username}, Pass1: ${pass1}, Pass2: ${pass2}`)
            id = user.length
            user.push(username)
            user[id] = new bankUser(username, 0, id);

            
            // VALIDATION CHECK: Password Match & Existinguser
            var currentDisplay = document.getElementById('sign-up-display');        // takes current display div
            if (user[id].isValidSignUp(pass1,pass2) !== false) {
                alert(`${user[id].isValidSignUp(pass1,pass2)} `)
                currentDisplay.style.display = 'block';
                currentDisplay.innerHTML = user[id].isValidSignUp(pass1,pass2);
                user.pop(); 
                showpage = 'stay'
            } else {
                alert("Valid Input")

                currentUser = user[id];
                currentUser.password = pass1
                showpage = 'close'; 
            };
            //ADDING IMAGE
            let list = document.getElementById('output-list')
            currentUser.addUser(imageLink)
            console.log(currentUser.image)
            document.getElementById('header-image').src =currentUser.image
            document.getElementById('current-money').innerHTML = currentUser.balance
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
            let balanceDisplay = document.getElementById("modal-amount")
            balanceDisplay.style.display = 'block';
            balanceDisplay.innerHTML = currentUser.balance
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
            action = 'close-window'
            break;
        case 'user-list':
            showpage = 'user-list'
            break;
        case 'signIn':
            showpage = 'first-page'
            break;
        default :
        showpage = 'stay'
            stat = false
            break;
    }

    console.log(`Showpage: ${showpage}`)
    if (showpage === 'user-list') {
        modal.style.display = 'block'
        document.getElementById('modal-content-2').style.display = 'flex';
    } else if (showpage !== 'close' && showpage !== '' && showpage !== 'stay'){ 
        document.getElementById(`${showpage}`).style.display = 'block';
    } else if(showpage == 'close') {
        document.getElementById('signIn').style.display = 'none';
    } else  if (stat === true && showpage === '') {
        document.getElementById('modal-title').innerHTML = action
        modal.style.display = 'block'
        document.getElementById('modal-content-1').style.display = 'flex';
     } else {
        stat = false;
    }
    
// hold the action required
    if (action === "deposit" || action === 'withdraw' || action === 'send-money'){
        previousAction = action;
    }  else {
        console.log(`Saved Previous Action: ${previousAction}`)
    }

// close modal window
    if (event.target.className === 'close'|| action === 'close-window') {
        currentUser.displayItems('block')
        input.value = null
    }
}

// Add image during sign up
window.addEventListener('load', function () {
    document.getElementById('image').addEventListener('change',function() {
        if (this.files && this.files[0]) {
            imageLink = URL.createObjectURL(this.files[0]);
        }
    })
})
