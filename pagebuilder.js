// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {
    IN.Event.on(IN, "auth", getProfileData);
}

// Handle the successful return from the API call
function onSuccess(data) {
    console.log(data);

    try {

        //extract data from users linkedin account
        var firstName = data["firstName"];
        var lastName = data["lastName"];
        var headline = data["headline"];
        var profilePic = data.pictureUrls.values[0];
        var linkedinAccount = data["publicProfileUrl"];
        var summary = data["summary"];
        var email = data["emailAddress"];

        //build the information into a profile
        //var profileBuilder = "<div id=\"nav\"><ul>";
        //profileBuilder += "<li><a href=\"#about\">About</a></li>";
        //profileBuilder += "<li><a href=\"#resume\">Resume</a></li>";
        //profileBuilder += "<li><a href=\"#projects\">Projects</a></li>";
        //profileBuilder += "<li><a href=\"#contact-title\">Contact</a></li></ul>";
        //profileBuilder += "</div>""
        var profileBuilder = "<div id=\"main\">";
        profileBuilder += "<div id=\"title-block\">";
        profileBuilder += "<h1 id=\"title\">" + firstName + " " + lastName + "</h1>";
        profileBuilder += "<h3 id=\"sub-title\">" + headline + "</h3>";
        profileBuilder += "</div></div>";
        profileBuilder += "<div class=\"container\">";
        profileBuilder += "<span class=\"anchor\" id=\"about\"><br><br><br><br></span>"
        profileBuilder += "<h2>About Me</h2>";
        profileBuilder += "<div id=\"about-me\">";
        profileBuilder += "<p>" + summary + "</p> </div> </div>";
        profileBuilder += "<span class=\"anchor\" id=\"contact-title\"><br><br><br><br></span>";
        profileBuilder += "<h2>Contact</h2>";
        profileBuilder += "<div class=\"container\">";
        profileBuilder += "<img id=\"profile\" src=\"" + profilePic + "\" alt=\"Profile Picture\">";
        profileBuilder += "<div class=\"content\" id=\"contact\">";
        profileBuilder += "<p><span class=\"important\">Email: </span>" + email + "</p>";
        profileBuilder += "<ul id=\"icons\">";
        profileBuilder += "<li><a href=\"" + linkedinAccount + "\" target=\"_blank\"><img src=\"linkedinLogo.png\"></a></li>";
        profileBuilder += "</ul></div></div>";
        profileBuilder += "<div class=\"toTopWrapper\">";
        profileBuilder += "<a href=\"#\"><img class=\"toTop\" src=\"toTop.png\" alt=\"toTop\"></a>";
        profileBuilder += "</div>"

        $("#summary").html(profileBuilder);
    }
    catch (err) {
        window.alert("It looks like you don't have enough info on your linkedIn profile to create full web page.\nYou are probably missing a summary section or something... Sorry :(");
    }
}


// Handle an error response from the API call
function onError(error) {
    console.log(error);
}

// Use the API call wrapper to request the member's basic profile data
function getProfileData() {
    IN.API.Raw("people/~:(firstName,lastName,headline,pictureUrl,publicProfileUrl,summary,email-address,picture-urls::(original))?format=json").result(onSuccess).error(onError);
}
