// start of global variables 
var nameInput = document.getElementById("websitename");
var urlInput = document.getElementById("websiteurl");
var bookmarksList = [];

// condition to check if there's existing data in local storage and then display it 
if (localStorage.getItem("bookmarks") !== null) {
  bookmarksList = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

//============= start of functions 
// function to add new bookmarks 
function addBookmark() {
  if (validationInputs(nameInput) && validationInputs(urlInput)) {
    var bookmark = {
      wName: nameInput.value.trim(),
      wUrl: urlInput.value.trim(),
    };
    bookmarksList.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    displayBookmarks();
    clearInput();
  } else {
      document.getElementById("popup").classList.remove("d-none");
      document.getElementById("overlay").classList.remove("d-none");
  }
}

// function to clear the inputs once the user successfully adds a new website 
function clearInput() {
  nameInput.value = null;
  urlInput.value = null;
  nameInput.classList.remove("is-valid");
  urlInput.classList.remove("is-valid");
}

// function to check the url enterd by the user and make it reachable by adding http:// first 
function httpCheck(url) {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return "http://" + url;
  }
  return url;
}

// function to display saved bookmarks on html page
function displayBookmarks() {
  var content = "";
  for (var i = 0; i < bookmarksList.length; i++) {
    content += `
                <tr>
                <th>${i}</th>
                <td>${bookmarksList[i].wName}</td>
                <td>
                  <a href="${httpCheck(bookmarksList[i].wUrl)}" target="_blank">
                    <button class="btn rounded border">
                      <i class=" fa-solid fa-eye"></i> Visit
                    </button>
                  </a>
                </td>
                <td>
                  <button onClick="deleteBookmark(${i})" class="btn border rounded"><i class="fa-solid fa-trash"></i> Delete</button>
                </td>
              </tr>
        `;
  }
  document.getElementById("table-data").innerHTML = content;
}

// function to delete a saved website upon request by the user
function deleteBookmark(index) {
  bookmarksList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
  displayBookmarks();
}

// function to validate both website name and url 
function validationInputs(element) {
  var text = element.value;
  var regex = {
    websitename: /^[a-zA-Z0-9- ]{1,63}$/,
    websiteurl:
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([\/\w\-\.~:?#[\]@!$&'()*+,;=]*)?$/,
  };
  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    return false;
  }
}

// function to hide validation info popup window 
function hidePopUp() {
    document.getElementById("popup").classList.add("d-none");
    document.getElementById("overlay").classList.add("d-none");
}

//==================== end of functions 