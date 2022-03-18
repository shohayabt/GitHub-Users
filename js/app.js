

const userCard = document.getElementById('user-card');
const showError = document.getElementById("error-message");
const search = document.querySelector('.search input');
search.addEventListener('keypress',(e) =>{
    if(e.keyCode === 13){
        document.getElementById('search-button').click()
    }
})

const errorMessage = (m) => {
    showError .value = m;
}
const loadUser = () =>{
    userCard.innerHTML = '';
    let userName = search.value;
    
    if(userName ==="" || typeof(userName) == Number ){
        userCard.style.display = 'none'
        showError.style.display = 'block'
        errorMessage("You have to input something to search. ")
    }
    else{
        showError.style.display = 'none'
        userName = userName.toLowerCase();
        fetch(`https://api.github.com/users/${userName}`)
        .then(res => res.json())
        .then(data => setUsers(data))
    }
}
const setUsers = (user) =>{
    if(user.message === 'Not Found' ){
        document.querySelector('.search input').value = '';
        userCard.style.display = 'none'
        showError.style.display = 'block'
        errorMessage('404 USER NOT FOUND')
        setTimeout(() =>{
            location.reload();
        },2000)
    }
    else{
        document.querySelector('.search input').value = '';
        const div = document.createElement('div');
        div.innerHTML = 
    `
    <div id="user-card">
        <div class="cover-image">
            <a href="${user.html_url}" target="_blank">
                <div class="profile-picture">
                <img src="${user.avatar_url}">
                </div>
            </a>
 
        </div>
        <div class="user-information">
            <a href="${user.html_url}" target="_blank">
                <h1 class="user-name">${user.name? user.name : user.login}</h1>
            </a>
            <small style="display: block;  color: red;">${user.id}</small>
            <span><i class="fa-solid fa-location-dot"></i>${user.location ? user.location : "can't find user location"}</span>
        </div>
        <div class="bio">
            <p>${user.bio ? user.bio : "Sorry can't find user bio" }</p>
        </div>
        <div class="others-information">
            <div><small>Public Repos</small><small>${user.public_repos}</small></div>
            <div><small>followers</small><small>${user.followers}</small></div>
            <div><small>following</small><small>${user.following}</small></div>
        </div>
    </div>
    `
    userCard.appendChild(div);
    }
}