// global variables
var yourName = document.getElementById("yourname"),
  theirName = document.getElementById("theirname"),
  calcBtn = document.querySelector("button"),
  yourlovescoreis = document.getElementById("yourlovescoreis"),
  loveScore = Math.random() * 100,
  loveInfo = document.getElementById("loveinfo"),
  reloadBtn = document.getElementById("reload");

loveScore = Math.floor(loveScore) + 1;

//capitalize input values
function capitalize_Words(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Love Score Counter
function love() {
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  (async function () {
    var i = 0;
    while (i < loveScore) {
      document.getElementById("score").innerHTML = i + "%";
      await sleep(20);
      i++;
    }
  })();
}

// Function to generate love letter using ChatGPT API
async function generateLoveLetter(yourName, theirName) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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' // Replace YOUR_API_KEY with your actual API key
    },
    body: JSON.stringify({
      "model": "text-davinci-003", // You can choose the model according to your preference
      "prompt": `Write a love letter from ${yourName} to ${theirName}.`,
      "temperature": 0.7,
      "max_tokens": 150
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

// Add eventlistener to button
calcBtn.addEventListener("click", async function (e) {
  loveScore = Math.random() * 100; //delete this line if you want to keep the same value in the same session.
  e.preventDefault();
  if (yourName.value == "" && theirName.value == "") {
    alert("You can't leave fields empty");
  }
  if (yourName.value == "") {
    alert("Please Enter Your Name");
  }
  if (theirName.value == "") {
    alert("Please Enter His/Her Name");
  }

  //lovescore conditions
  else {
    yourlovescoreis.innerHTML = "Your Love Score is";
    love();
    reloadBtn.style.display = "block";
    loveInfo.innerHTML = await generateLoveLetter(
      capitalize_Words(yourName.value),
      capitalize_Words(theirName.value)
    );
  }
});
