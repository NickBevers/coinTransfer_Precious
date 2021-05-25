let recipient;
window.addEventListener("load", function(){
    let tokencheck = localStorage.getItem("token");

    if(!tokencheck){
        alert("wrong page");
        window.location.replace("login.html");
    }
    else{
        let userInput = document.querySelector(".recipient");
        let possibleRecipient = document.querySelector(".recipientList");
        
        clearForm();

        const searchUser = async (textToSearch) => {
            possibleRecipient.innerHTML = "";
            let res = await fetch("/users/getdata", {
                method: "get",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resJson = await res.json();
            let users = resJson.data;

            let matches = users.filter(user =>{
                const regex = new RegExp(`^${textToSearch}`, 'gi');
                return user.firstname.match(regex) || user.lastname.match(regex);
            });

            if (userInput.value.length == 0){
                matches = [];
                possibleRecipient.style.visibility = "hidden";
            }
            
            if (userInput.value.length > 0){
                possibleRecipient.style.visibility = "visible";
            }


            if(matches.length > 0){
                matches.forEach(element => {
                    let userItem = `<div class="recipientList__item" data-email = "${element.email}">${element.firstname} ${element.lastname}</div>`
                    possibleRecipient.innerHTML += userItem;
                });

                possibleRecipient.childNodes.forEach(child => {
                    child.addEventListener("click", () => {                  
                        userInput.value = child.innerHTML;
                        possibleRecipient.style.visibility = 'hidden';
                        recipient = child.dataset.email;
                    })
                })
            }
        }
        
        userInput.addEventListener("input", () =>{
            searchUser(userInput.value);
        });

        document.querySelector(".button").addEventListener("click", async () => {
            let amount = document.querySelector(".amount").value;
            let reason = document.querySelector(".custom-dropdown").value;
            let message = document.querySelector(".message").value;
            let tokencheck = localStorage.getItem("token");

            if (recipient == undefined || recipient == null || amount == undefined || reason == undefined || reason == ""){
                // Message with "Please fill in all fields (message is optional)"
                this.alert("Fill in everything")
            }

            
            fetch("/api/v1/transfers", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokencheck}`
                },
                body: JSON.stringify({
                    "recipient": recipient,
                    "amount": amount,
                    "reason": reason,
                    "message": message
                })
            }).then(response => {
                return response.json();
            }).then(json => {
                if(json.status === "Success"){
                    //console.log("SUCCES - Transaction sent")
                    clearForm();
                    window.location.replace("home.html");
                }
                
                if(json.status === "Error"){
                    //console.log(`${json.message}`)
                }

            })
        });

        function clearForm(){
            userInput.value = "";
            document.querySelector(".amount").value = "";
            document.querySelector(".custom-dropdown").value = "Reason";
            document.querySelector(".message").value = "";
        }
    }
});