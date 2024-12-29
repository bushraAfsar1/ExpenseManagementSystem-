let passError = document.getElementById("passError");

const currentUser = JSON.parse(localStorage.getItem("allUserData"))
const usersArray = JSON.parse(localStorage.getItem("users"))

usersArray.forEach(values => {
    if (+currentUser.id === +values.id) {
        document.getElementById("name").innerText = values.sUserName;
    }
})
function addExpenseData() {
    const usersArr = JSON.parse(localStorage.getItem("users"))
    document.getElementById("table").innerHTML = ""
    const trHeading = document.createElement("tr")
    const thId = document.createElement("th")
    const thCategory = document.createElement("th")
    const thDescription = document.createElement("th")
    const thAmount = document.createElement("th")
    const thActions = document.createElement("th")
    thId.innerText = "Ex.id"
    thCategory.innerText = "Category"
    thDescription.innerText = "Description"
    thAmount.innerText = "Amount"
    thActions.innerText = "Actions"
    trHeading.append(thId)
    trHeading.append(thCategory)
    trHeading.append(thDescription)
    trHeading.append(thAmount)
    trHeading.append(thActions)
    document.getElementById("table").appendChild(trHeading)
    usersArr.forEach(values => {
        if (+currentUser.id === +values.id) {
            document.getElementById('category').innerHTML = ''
            values.categories.forEach(category => {
                const optionCategory = document.createElement("option");
                optionCategory.innerText = category;
                document.getElementById('category').appendChild(optionCategory)
            })
            values.allExpenses.forEach(expense => {
                const tr = document.createElement("tr")
                const tdId = document.createElement("td")
                const tdCategory = document.createElement("td")
                const tdDescription = document.createElement("td")
                const tdAmount = document.createElement("td")
                const tdActions = document.createElement("td")
                const tdBtnEdit = document.createElement("button")
                const tdBtnDelete = document.createElement("button")
                tdBtnDelete.setAttribute('onclick', `removeExpense(${expense.id})`)
                tdBtnEdit.setAttribute('onclick', `editExpense(${expense.id})`)
                tdBtnEdit.setAttribute('class', expense.id)
                tdBtnEdit.innerText = "Edit"
                tdBtnDelete.innerText = "Remove"
                tdId.append(expense.id)
                tdCategory.append(expense.category)
                tdAmount.append("Rs " + expense.amount + " /-")
                tdAmount.setAttribute("class", expense.id)
                tdDescription.append(expense.description)
                tdDescription.setAttribute("class", expense.id)
                tdActions.append(tdBtnEdit, tdBtnDelete)
                tr.append(tdId)
                tr.append(tdCategory)
                tr.append(tdDescription)
                tr.append(tdAmount)
                tr.append(tdActions)
                tdBtnEdit.style.width = "85px";
                tdBtnDelete.style.width = "85px";
                document.getElementById("table").appendChild(tr)

            })
        }
    })
}
addExpenseData()
function setItem() {
    const sUserName = document.getElementById("sUserName");
    const sEmail = document.getElementById("sEmail");
    const sPassword = document.getElementById("sPassword");
    const sConfirmPassword = document.getElementById("sConfirmPassword");

    let user = {
        sUserName: sUserName.value,
        sEmail: sEmail.value,
        sPassword: sPassword.value,
        sConfirmPassword: sConfirmPassword.value,
        id: Math.floor(Math.random() * 1000),
        allExpenses: [],
        categories: [],
    };
    console.log(user)
    Math.floor(user.id)
    let users = [];
    if (JSON.parse(localStorage.getItem("users"))) {
        const prevUsers = JSON.parse(localStorage.getItem("users"));
        prevUsers.forEach(element => {
            users.push(element);
        });
    }
    users.push(user)
    localStorage.setItem("users", JSON.stringify(users));


    let popup = document.getElementById("popup");


    if (!(user.sPassword === user.sConfirmPassword)) {
        sConfirmPassword.style.border = "1px solid red";
        passError.style.display = "block";
        sConfirmPassword.focus();
        return false;
    }
    else if (user.sPassword.length < 8) {
        sPassword.style.border = "1px solid red";
        span.style.display = "block";
        sPassword.focus();
        return false;
    }
    else {
        popup.classList.add("openPopup");
        sUserName.value = ""
        sEmail.value = ""
        sPassword.value = ""
        sConfirmPassword.value = ""
        sPassword.style.border = "1px solid transparent";
        sConfirmPassword.style.border = "1px solid transparent";
        span.style.display = "none";
        passError.style.display = "none";



    };
};

function closePopup() {
    popup.classList.remove("openPopup")
}

//log-in

function getItem() {
    const passValidatin = document.getElementById("passErr");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let islogin = false;
    let loginDetails;
    let usersData = JSON.parse(localStorage.getItem('users'));
    usersData.forEach(user => {
        if (email.value === user.sEmail && password.value === user.sPassword) {
            console.log("user found")
            islogin = true
            loginDetails = { ...user }
        }
    });
    if (islogin) {
        localStorage.setItem('allUserData', JSON.stringify(loginDetails))
        window.location.replace("./dashboard.html")
    } else {
        // alert("user not found! \n Check email or password");
        email.style.border = "1px solid red";
        passValidatin.style.display = "block";
        email.focus();
    };
}

//dashboard
let inputs = document.getElementById("inp");



function addExpense() {
    inputs.style.display = "block";
}
function done() {
    inputs.style.display = "none";
}


function add() {
    const description = document.getElementById("description");
    const category = document.getElementById("category");
    const amount = document.getElementById("amount");
    const expense = {
        description: description.value,
        category: category.value,
        amount: amount.value,
        id: Math.floor(Math.random() * 1000)
    }

    if (!(description === "") && !(category === "") && !(amount === "")) {
        let newData;
        usersArray.map(values => {
            if (+currentUser.id === +values.id) {
                newData = [...values.allExpenses, expense]
                return values.allExpenses = newData
            }
        })
        localStorage.setItem("users", JSON.stringify(usersArray))
        addExpenseData()
        description.value = ""
        amount.value = ""
    } else {
        console.log("gg")
    }
}
let categoryPopUp = document.getElementById('categoryPopup')
function openCategoryPopUp() {
    console.log("open")
    categoryPopUp.classList.add("categoryPopup");
}

function closeCategoryPopup() {
    categoryPopUp.classList.remove("categoryPopup")
    const category = document.getElementById('popupInput').value
    if (!(category === "")) {
        let newData;
        usersArray.map(values => {
            if (+currentUser.id === +values.id) {
                newData = [...values.categories, category]
                return values.categories = newData
            }
        })
        localStorage.setItem("users", JSON.stringify(usersArray))
        addExpenseData()
    }
}
function searchFunction() {
    let searchInput = document.getElementById("search");
    let search = searchInput.value.toUpperCase();
    let tr = document.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]
        if (td) {
            text = td.textContent || td.innerText
            if (text.toUpperCase().indexOf(search) > -1) {
                tr[i].style.display = ""
            }
            else {
                tr[i].style.display = "none"

            }
        }
    }
}

const editExpense = (id) => {
    usersArray.forEach(values => {
        if (+currentUser.id === +values.id) {
            values.allExpenses.forEach(expenses => {
                if (+expenses.id === +id) {
                    const elements = document.getElementsByClassName(expenses.id)
                    for (let i = 0; i < elements.length; i++) {
                        if (i === 2) {
                            elements[i].innerHTML = "Done";
                            elements[i].setAttribute("id", id)
                            elements[i].setAttribute("onclick", `saveExpense(${id})`)
                        } else {
                            elements[i].innerHTML = `
                            <input type="text"/ >
                            `
                        }
                    }
                }
            })
        }
    })
}

const removeExpense = (id) => {
    let newData;
    usersArray.map(values => {
        if (+currentUser.id === +values.id) {
            values.allExpenses.forEach((expense, index) => {
                if (+expense.id === +id) {
                    values.allExpenses.splice(index, 1)
                }
            })
            newData = [...values.allExpenses]
            return values.allExpenses = newData
        }
    })
    localStorage.setItem("users", JSON.stringify(usersArray))
    addExpenseData()
}

const saveExpense = (id) => {
    const elements = document.getElementsByClassName(id)
    for (let i = 0; i < elements.length; i++) {
        if (i === 2) {
            localStorage.setItem("users", JSON.stringify(usersArray))
            addExpenseData()
        } else {
            const child = elements[i].childNodes;
            const value = child[1].value;
            let newData;
            usersArray.map(values => {
                if (+currentUser.id === +values.id) {
                    values.allExpenses.forEach(expense => {
                        if (+expense.id === +id) {
                            if (i === 0) {
                                expense.description = value
                            }
                            if (i === 1) {
                                expense.amount = value
                            }
                        }
                    })
                    newData = [...values.allExpenses]
                    return values.allExpenses = newData
                }
            })
        }
    }
}