//----------SignIn------------

var emailInputSignIn = document.getElementById('userEmailSignIn')
var passInputSignIn = document.getElementById('userPassSignIn')

var alertEmailSignIn = document.querySelector('.alert-email-SignIn')
var alertPasswordSignIn = document.querySelector('.alert-pass-SignIn')

var signInButton = document.querySelector('.signIn-button')

var welcome = document.querySelector('.hero-section')
//----------SignUp------------

var nameInputSignUp = document.getElementById('userNameSignUp')
var emailInputSignUp = document.getElementById('userEmailSignUp')
var passInputSignUp = document.getElementById('userPassSignUp')

var alertEmail = document.querySelector('.alert-email')
var alertPassword = document.querySelector('.alert-pass')
var alertName = document.querySelector('.alert-name')


var signUpButton = document.querySelector('.signUp-button')

var container = []

if (localStorage.getItem('userData') != null) {
    container = JSON.parse(localStorage.getItem('userData'))
}
//---------------------------------------------------------------------------------------------imageDownload----------------------------

let imageChanger = document.querySelector('.image-download img') //----> container
let buttonDownload = document.querySelector('.download-button') //----> button
let buttonDownloadAccept = document.querySelector('.download-button-accept') //----> button
let iconUser = document.querySelectorAll('.iconUser')
let icon = document.querySelector('.icons-container')
let marker = document.querySelector('.marker')

buttonDownload.addEventListener('click', function () {
    icon.classList.toggle('d-none')
})
icon.addEventListener('click', function (e) {
    var iconSrc = e.target.getAttribute('src')
    if (iconSrc !== null) {
        imageChanger.src = iconSrc
        for (let i = 0; i < iconUser.length; i++) {
            icon.classList.add('d-none')
        }
    }
    else{
        imageChanger.src = imageChanger.src
    }
})


// downloadImage.addEventListener('change', function() {
//     const file = this.files[0];

//   if (file.size > 1048576) { // 1MB in bytes
//     buttonDownload.innerHTML = `<p class="download-button my-3 p-3 rounded-5 bg-danger border-black"> This Image Size more than 1 mega byte / Download another Image</p>`
//   } else {
//     buttonDownload.innerHTML = `<p class="download-button my-3 p-3 rounded-5">Download Your Picture / not bigger than 1 mega byte <i class="fa-solid fa-cloud-arrow-down"></i></p>`
//     const reader = new FileReader();
//     reader.onload = function(e) {
//         imageContainer.src = e.target.result;
//     }
//     reader.readAsDataURL(file);
//   }

// });
//---------------------------------------------------------SignUp------------------------------------------------//

signUpButton.addEventListener('click', add)
function add() {
    ////////////////////////////    ---------> for loop to check the email
    function looper() {
        if (localStorage.getItem('userData') !== null) {
            for (var i = 0; i < container.length; i++) {
                if (container[i].userEmail.includes(emailInputSignUp.value) == true) {
                    return true
                }
            }
        }
    }
    /////////////////////////
    if (localStorage.getItem('userData') == null && regexEmail() == true && regexPassword() == true && regexName() == true) {
        var data = {
            userImage: imageChanger.src,
            userName: nameInputSignUp.value,
            userEmail: emailInputSignUp.value,
            userPassword: passInputSignUp.value
        }
        container.push(data)
        localStorage.setItem('userData', JSON.stringify(container))
        clear()
        popLayer.classList.remove('d-none')
        popUp.classList.remove('d-none')
        clickSignIn.classList.add('lightSignIn')
    }
    else if (looper() !== true && regexEmail() == true && regexPassword() == true  && regexName() == true) {
        var data = {
            userImage: imageChanger.src,
            userName: nameInputSignUp.value,
            userEmail: emailInputSignUp.value,
            userPassword: passInputSignUp.value
        }
        alertEmail.classList.add('d-none')
        alertPassword.classList.add('d-none')
        container.push(data)
        localStorage.setItem('userData', JSON.stringify(container))
        clear()
        popLayer.classList.remove('d-none')
        popUp.classList.remove('d-none')
        clickSignIn.classList.add('lightSignIn')
    }
    else if (regexEmail() == false && regexPassword() == false && regexName() == false) {
        alertEmail.classList.remove('d-none')
        alertPassword.classList.remove('d-none')
        alertName.classList.remove('d-none')
    }
    else if (emailInputSignUp.value == "" && passInputSignUp.value == "") {
        document.querySelector('.alert-buttonSignUpS').classList.remove('d-none')
        
    }
    else if (looper() == true) {
        document.querySelector('.alert-buttonSignUpS').classList.add('d-none')
        emailInputSignUp.classList.add('is-invalid')
        emailInputSignUp.classList.remove('is-valid')
        popLayer.classList.remove('d-none')
        popUpError.classList.remove('d-none')
    }


}

//---------------------------------------------------------SignIn------------------------------------------------//

signInButton.addEventListener('click', function () {
    function loopers() {
        if (localStorage.getItem('userData') !== null) {
            for (var i = 0; i < container.length; i++) {
                if (container[i].userEmail == emailInputSignIn.value && container[i].userPassword == passInputSignIn.value) {
                    localStorage.setItem('name', JSON.stringify(container[i].userName))
                    localStorage.setItem('img', JSON.stringify(container[i].userImage))
                    localStorage.setItem('userEmail', JSON.stringify(container[i].userEmail))
                    return true
                }
            }
        }
    }
    if (emailInputSignIn.value == "" || passInputSignIn.value == "") {
        document.querySelector('.alert-buttonSignInS').classList.remove('d-none')
    }
    else if (loopers() == true) {
        window.location.replace('welcome.html')
        document.querySelector('.alert-buttonSignInS').classList.add('d-none')
        clearSignIn()
    }
    else if (loopers() !== true) {
        popLayer2.classList.remove('d-none')
        popUpError2.classList.remove('d-none')
        document.querySelector('.alert-buttonSignInS').classList.add('d-none')

    }
    else if (localStorage.getItem('userData') == null) {
        popLayer2.classList.remove('d-none')
        popUpError2.classList.remove('d-none')
    }
    
})

//-------------------------------------------------------------------------Regex-----------------------------------------------

nameInputSignUp.addEventListener('keyup', regexName)
emailInputSignUp.addEventListener('keyup', regexEmail)
passInputSignUp.addEventListener('keyup', regexPassword)

function regexName() {
    var regexUserName = /^[A-z]{3,20}$/
    if (regexUserName.test(nameInputSignUp.value) == true) {

        nameInputSignUp.classList.add('is-valid')
        nameInputSignUp.classList.remove('is-invalid')
        alertName.classList.add('d-none')


        return true

    }
    else {
        nameInputSignUp.classList.add('is-invalid')
        nameInputSignUp.classList.remove('is-valid')
        alertName.classList.remove('d-none')


        return false
    }
}

function regexEmail() {
    var regexUserEmail = /^[a-zA-Z][a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)$/
    if (regexUserEmail.test(emailInputSignUp.value) == true) {

        emailInputSignUp.classList.add('is-valid')
        emailInputSignUp.classList.remove('is-invalid')
        document.querySelector('.alert-buttonSignUpS').classList.add('d-none')
        alertEmail.classList.add('d-none')

        return true

    }
    else {
        emailInputSignUp.classList.add('is-invalid')
        emailInputSignUp.classList.remove('is-valid')
        document.querySelector('.alert-buttonSignUpS').classList.add('d-none')
        alertEmail.classList.remove('d-none')
        return false
    }
}
function regexPassword() {
    var regexUserPassword = /^[\*\-\+\-\)\(\&\^\%\$\#\@\!\~\.\w]{7,20}$/
    if (regexUserPassword.test(passInputSignUp.value) == true) {
        passInputSignUp.classList.add('is-valid')
        passInputSignUp.classList.remove('is-invalid')
        document.querySelector('.alert-buttonSignUpS').classList.add('d-none')
        alertPassword.classList.add('d-none')


        return true
    }
    else {
        passInputSignUp.classList.add('is-invalid')
        passInputSignUp.classList.remove('is-valid')
        document.querySelector('.alert-buttonSignUpS').classList.add('d-none')
        alertPassword.classList.remove('d-none')

        return false
    }
}


//----------------------------------------------------------------------clear-------------------------------------

function clear() {
    emailInputSignUp.value = ""
    passInputSignUp.value = ""
    nameInputSignUp.value = ""
    imageChanger.src = "Images/robot-8458438_1280.png"
    nameInputSignUp.classList.remove('is-valid')
    nameInputSignUp.classList.remove('is-invalid')
    emailInputSignUp.classList.remove('is-invalid')
    emailInputSignUp.classList.remove('is-valid')
    passInputSignUp.classList.remove('is-invalid')
    passInputSignUp.classList.remove('is-valid')
    icon.classList.add('d-none')


    alertName.classList.add('d-none')
    alertEmail.classList.add('d-none')
    alertPassword.classList.add('d-none')


}

function clearSignIn() {
    emailInputSignIn.value = ""
    passInputSignIn.value = ""
    document.querySelector('.alert-buttonSignInS').classList.add('d-none')


}


// ------------------------------------

var clickSignIn = document.getElementById('hasAccount')
var clickSignUp = document.getElementById('SignUp')
var card = document.querySelector('.card')


clickSignIn.addEventListener('click', function () {
    clear()
    clickSignIn.classList.remove('lightSignIn')
    card.classList.toggle('rotateY')
})

clickSignUp.addEventListener('click', function () {
    clearSignIn()
    card.classList.toggle('rotateY')
})

var popLayer = document.querySelector('.poplayer')
var popLayer2 = document.querySelector('.poplayer2')
var popUp = document.querySelector('.popup')
var popUpError = document.querySelector('.popup-error1')
var popUpError2 = document.querySelector('.popup-error2')
var popButton = document.querySelector('.success-Button')
var popButtonError = document.querySelector('.error-Button')
var popButtonError2 = document.querySelector('.error-Button2')
popButton.addEventListener('click', function () {
    popLayer.classList.add('d-none')
    popUp.classList.add('d-none')
})
popButtonError.addEventListener('click', function () {
    popLayer.classList.add('d-none')
    popUpError.classList.add('d-none')
})
popButtonError2.addEventListener('click', function () {
    popLayer2.classList.add('d-none')
    popUpError2.classList.add('d-none')
})



