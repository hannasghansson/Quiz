function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}



// quiz =
// quiz_number =
// question = Fråga
// allQuestions = Alla frågor
// userAnswer = Användarens valda svarsalternativ
// answerChoices =  De tre Svarsalternativen.
// answerA, answerB, answerC = De 3 Svarsalternativen uppdelade a,b,c
// position = Vilken fråga användaren är på ex 3 av 10
// correct = Korrekta svaren


var quiz, quiz_number, question, userAnswer, answerChoices, answerA, answerB, answerC;
var position = 0;
var correct = 0;


// Skapar frågorna, svarsalternativ och det korrekta svaret. 
allQuestions
var allQuestions = [
  {
    question: "Hur många gånger sjunger Triad DOM innan de sjunger tänd ett ljus?",
    a: "7",
    b: "55",
    c: "26",
    answer: "B",
    checkbox: true
  },
    
  {
    question: "Berlinmuren, gick den runt..?",
    a: "Östberlin",
    b: "Både öst och väst",
    c: "Västberlin",
    answer: "C"
  },

  {
    question: "Gubben som syns på monopolspelets kartong, har han monokel eller känns det bara som att han har monokel?",
    a: "Ja, självklart!",
    b: "Nej, han har ingen monokel",
    c: "Who knows, who cares...",
    answer: "B"
  },

  {
    question: "Vad har saffran för färg?",
    a: "Orange",
    b: "Gul",
    c: "Röd",
    answer: "C"
    
  },

  {
    question: "Kan man se kinesiska muren från månen?",
    a: "Nej",
    b: "Ja",
    c: "Beror på lutningen är på månen",
    answer: "A"
  },

  {
    question: "Har Alfred Nobel fått Nobelpriset?",
    a: "Ja",
    b: "Vem är Alfred?",
    c: "Nej",
    answer: "C"
  },

  {
    question: "Vilken är Arla-kons officiella färgkombination?",
    a: "Grönt & Vit",
    b: "Vit & röd",
    c: "Vit, Röd & Grönt",
    answer: "B"
  },

  {
    question: "Är Putin helt flintskallig?",
    a: "Ja",
    b: "Nej",
    c: "Ingen som vet...",
    answer: "B"
  },

  {
    question: "Vilket djur dödar flest människor?",
    a: "Flodhästar",
    b: "Myggor",
    c: "Ormar",
    answer: "B",
  },

  {
    question: "Är kyckling och höna samma djur?",
    a: "Beror på hur man ser det...",
    b: "Nej",
    c: "Ja",
    answer: "C"
  },
];

// Skapar en funktion som hämtar frågorna och svaren med hjälp av document.getElementById();
// med hjälp av get() funktion så behöver vi bara skriva 1 gång.

function get(x){
  return document.getElementById(x);
}
// Funktion renderQuestion kollar vart användaren är, om använder inte är klar fortsätter den ställa frågorna
// Annars skriver den ut hur många rätt anävnder fick under omgången. 
function renderQuestion(){
  quiz = get("quiz");
  if(position >= allQuestions.length){
    
    colorName = "";
    procent = correct/allQuestions.length;
    if (procent <= 0.5) {
      colorName = "red";
    }
    else if (procent <= 0.74) {
      colorName = "orange";
    }
    else if (procent <= 1) {
      colorName = "green";
    }
    
    quiz.innerHTML = "<h2 class=\""+colorName+"\">Du fick "+correct+" av "+allQuestions.length+" frågor rätt!</h2><button onclick='renderQuestion()'>Starta om</button>";
    get("quiz_number").innerHTML = "Wohoo, quizet är klart!";

    // Starta om quizet - så att det har 0. 
    position = 0;
    correct = 0;
    
    // Stoppar frågorna när man är klar.  
    return false;
  }

  // Så man vet vilken fråga man är på och hur många som är kvar. 
  get("quiz_number").innerHTML = "Fråga "+(position+1)+" av "+allQuestions.length;
  
  // Checkbox 
  let inputType = allQuestions[position].checkbox ? "checkbox" : "radio"

  question = allQuestions[position].question;
  answerA = allQuestions[position].a;
  answerB = allQuestions[position].b;
  answerC = allQuestions[position].c;
  

  // Skriver ut frågan 
  quiz.innerHTML = "<br>"+question+"</br>";

  // Skriver ut de olika svarsalternativen
  quiz.innerHTML += "<label> <input type='"+ inputType +"' name='answerChoices' value='A'> "+answerA+"</label><br>";
  quiz.innerHTML += "<label> <input type='"+ inputType +"' name='answerChoices' value='B'> "+answerB+"</label><br>";
  quiz.innerHTML += "<label> <input type='"+ inputType +"' name='answerChoices' value='C'> "+answerC+"</label><br><br>";

  // Tar använder vidare till nästa fråga.
  quiz.innerHTML += "<button onclick='next()'>Nästa fråga</button>";

  
}

// Kolla så att frågor är rätt. 
function next(){
  answerChoices = document.getElementsByName("answerChoices");
  for(var i=0; i<answerChoices.length; i++){
    if(answerChoices[i].checked){
      userAnswer = answerChoices[i].value;
    }
  }
  // Kollar att svaren stämmer med facit. Och om det är rätt ökar för poängen.
  if(userAnswer == allQuestions[position].answer){
    correct++;
  }
  // Ändrar positionen som använder är på
  position++;
  //  renderQuestion gör så att vi kommer till nästa fråga. 
  renderQuestion();
}

//Gör så att quizet laddar om. 
window.addEventListener("load", renderQuestion);