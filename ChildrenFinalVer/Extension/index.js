//**Index.js interacts with index.html to display the information from storage in the html tables*/

// Hardcoding the list of websites and privacy policy information for now. 
// Calling it 'dummy'. Currently unused, as we are pulling a file from a server further down
const dummy = {
  "www.google.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Google Privacy Policy Link",
    "clauses": "This is Google's Privacy Policy Info"
  },
  "www.reddit.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Reddit Privacy Policy Link",
    "clauses": "This is Reddit's Privacy Policy Info"
  },
  "www.youtube.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Youtube Privacy Policy Link",
    "clauses": "This is YouTube's Privacy Policy Info"
  },
  "www.facebook.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Facebook Privacy Policy Link",
    "clauses": "This is Facebook's Privacy Policy Info"
  },
  "www.tumblr.com":
  {
    "start_url": "Privacy Policy Link",
    "final_url": "Tumblr Privacy Policy Link",
    "clauses": "This is Tumblr's Privacy Policy Info"
  }
}


// list of alert words to check the titles against
var alerts = ["Porn", "Drug", "Weed", "Pot", "Suicide", "Drugs", "Sex", "Cannabis",
  "Hashish", "Hemp", "Herb", "Tea", "Help", "Ganja", "Hash", "Joint", "Reefer",
  "Doobie", "Loco Weed", "Porno", "Raunchy", "Steamy", "Sexy", "X-Rated", "xxx", "XXX", "Suicidal",
  "Self Mutilation", "Self-Mutilation", "Guns", "QAnon", "qanon", "Qanon", "Self-Injury",
  "marijuana", "weed"];

// Will use the fetch api to pull info from server.
// This is the file to be used in the fetch later
var fetch_file = "https://privacypandapolicies.s3.us-east-2.amazonaws.com/coppa_policies_converted.json"

// This function takes in an array, an object, and a table reference
// And adds a new row to the table for each object in the array
// Later we pass in the array of browsing history sorted by date,
// The object read in from the privacy policy file, and 
// The reference to the first table in index.html
function print_table(array, obj, table) {
  for (let i = 0; i < array.length; i++) {
    let info = array[i];
    let info_site = info[1];
    let info_date = info[0];

    // Insert new empty row
    let new_row = table.insertRow(-1);

    // Insert new cells for each relevant field
    let cell_site = new_row.insertCell(0);
    let cell_date = new_row.insertCell(1);
    let cell_clause = new_row.insertCell(2);
    let cell_link = new_row.insertCell(3);

    // Create Text to add to each new cell
    let text_site = document.createTextNode(info[1]);
    let text_date = document.createTextNode(info[0]);

    // If the current website domain is not in our external file,
    // We display "Not Found" in the appopriate extension fields
    // Otherwise, we get that information and display it

    if (obj[info_site] == undefined) {
      var text_clause = document.createTextNode("Not Found");
      var text_link = document.createTextNode("");
      cell_link.appendChild(text_link);
    }
    else {
      var text_clause = document.createTextNode(obj[info_site]["clauses"]);
      // var text_link = document.createTextNode(obj[info_site]["start_url"]);
      // make the privacy policy link a link 
      var a = document.createElement('a');
      var linkText = document.createTextNode(obj[info_site]["start_url"]);
      a.appendChild(linkText);
      a.title = obj[info_site]["start_url"];
      a.href = obj[info_site]["start_url"];
      cell_link.appendChild(a);
    }

    // Add Text to new cells
    cell_site.appendChild(text_site);
    cell_date.appendChild(text_date);
    cell_clause.appendChild(text_clause);
    // cell_link.appendChild(text_link);
  }
}

// The below will take get the information currently in local storage
// We are storing everything in an object called 'browse_info'
// And pulling that out of the argument we name 'result' below
chrome.storage.local.get('browse_info', function (result) {
  var lst = result.browse_info;

  // This section adds browsing history to a list, to sort by time accessed
  var sort_lst = []
  for (obj in lst) {
    sort_lst.push([lst[obj], obj])
  }
  sort_lst.sort()

  // In index.html, the table has id "table". 
  // The code below creates new rows there.
  let table_ref = document.getElementById("table");


  fetch(fetch_file)
    .then(response => response.json())
    .then(data => print_table(sort_lst, data, table_ref))

});

// The below code is to populate the 'Alerts' Table
chrome.storage.local.get('title', function (result) {
  var title_lst = result.title;
  // get the right table
  let table_ref = document.getElementById("alert_table");
  // iterate through all of the elements in title list
  for (const key in title_lst) {
    //check if the title contains any alert words
    curr_title = key;
    for (var a in alerts) {
      if (curr_title.includes(alerts[a])) {
        // if there is an alert, then make a new row in the table
        let new_row = table_ref.insertRow(-1);
        var text_alert = document.createTextNode("Alert Word: " + alerts[a]);
        // Insert new cells for each relevant field
        let new_cell = new_row.insertCell(0);
        let cell_date = new_row.insertCell(1);
        let cell_alert = new_row.insertCell(2);
        // Create Text to add to each new cell
        let new_text = document.createTextNode(key);
        let text_date = document.createTextNode(title_lst[key]);
        //Add the info to the table 
        new_cell.appendChild(new_text);
        cell_date.appendChild(text_date);
        cell_alert.appendChild(text_alert);
      }
    }
  }
});

