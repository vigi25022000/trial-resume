//Creating and storing credentials in local storage
const credentials = [
    {
        username: "admin",
        password: "xxx"
    }
];
localStorage.setItem('LoginUser', JSON.stringify(credentials));

function disableBack() {
    const not = "Successful";

    try {
        var checkLogin = sessionStorage.getItem("login");
        if (checkLogin === not) {
            window.history.forward();
        }
    } catch (error) {
        console.log(error);
    }
}

// Validating inputs
const userName = document.getElementById('username');
const password = document.getElementById('password');
const errorelement = document.getElementById('error');
userName.addEventListener('input', verify_username);
password.addEventListener('input', verify_password);

document.querySelector('.login_form').addEventListener('submit', function (e) {

    e.preventDefault();

    validated();
});

//validating input fields
function validated() {
    if (userName.value.length === 0 && password.value.length === 0) {
        errorelement.style.display = 'block';
        return false;
    } else if (userName.value.length === 0) {
        errorelement.style.display = 'block';
        userName.focus();
        return false;
    } else if (password.value.length === 0) {
        errorelement.style.display = 'block';
        password.focus();
        return false;
    } else {
        login();
    }
}

//username
function verify_username() {
    if (userName.value.length > 0) {
        return true;
    }
}

//check password
function verify_password() {
    if (password.value.length > 0) {
        return true;
    }
}

// verifying vlaid credentials and navigating to resume page
function login() {
    if (localStorage.getItem('LoginUser')) {
        const userDetails = JSON.parse(localStorage.getItem('LoginUser'));
        const currentUser = userDetails.find((user) => {
            if (userName.value === user.username) {
                return user;
            }
        });
        if ((userName.value.length && password.value.length) !== 0 && currentUser === undefined) {
            errorelement.style.display = 'block';
            return false;
        }
        if (currentUser.password === password.value) {
            alert('successfully logged in');
            sessionStorage.setItem("login", "Successful");

            // Navigate to resume page
            window.location.href = "resume_page.html";
            return true;
        }
        if (password.value.length !== 0) {
            console.log('Wrong username or password');
            errorelement.style.display = 'block';
            return false;
        }
    } else
        alert('Invalid credentials');
}
