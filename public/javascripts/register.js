let signup = document.querySelector(".submitBtn").addEventListener("click", function(){
    let firstname = document.querySelector(".firstname").value;
    let lastname = document.querySelector(".lastname").value;
    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;
    let confirmpassword = document.querySelector(".confirmpassword").value;

    let emailrestriction = email.indexOf("@student.thomasmore.be");
    let checkbox = document.querySelector(".custom-checkbox__input");

    if(emailrestriction === -1){
        console.log("Incorrect email");
    }
    else if(checkbox.checked === false){
        console.log("check the checkbox");
    }
    else if(password !== confirmpassword){
        console.log("password confirm is incorrect");
    }
    else{
        fetch("http://localhost:3000/users/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "firstname": firstname,
                "lastname": lastname,
                "email": email,
                "password": password
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            if(json.status === "success"){
                console.log("Signup complete!");

                let token = json.data.token;
                localStorage.setItem("token", token);
                window.location.href = "register.html"; // deze locatie waarschijnlijk nog aanpassen
            }
        })
    }
});