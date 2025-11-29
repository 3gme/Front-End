// Manage Title and footer
let gameName = "Guess Word Game";
document.title = gameName;

document.querySelector(`.title`).textContent = gameName;
document.querySelector(`footer`).textContent = `© ${new Date().getFullYear()} ${gameName}`;

let guessResultDiv = document.querySelector(`.guess-result`);

let maxTryies = 6;
let lettersPerTry = 5;
let hintsCount = 2;
let currentTry = 1;

// get word
let wordToGuess = "";
let letters = [];
let fetchWord = async () => {
  try {
    let response = await fetch(
      `https://random-word-api.vercel.app/api?words=1&length=${lettersPerTry}`
    );
    let data = await response.json();
    wordToGuess = data[0];
    letters = wordToGuess.split("");
    console.log(`Word to guess: ${wordToGuess}`); // For testing purposes
  } catch (error) {
    console.error("Error fetching the word:", error);
  }
};
fetchWord();


const guesses = document.querySelector(`.tryies`);

function generateTries() {
  for (let i = 0; i < maxTryies; i++) {
    const tryDiv = document.createElement(`div`);
    tryDiv.innerHTML = `<span> Try ${i + 1} </span>`;
    tryDiv.classList.add(`try`);

    for (let j = 0; j < lettersPerTry; j++) {
      const inputLetter = document.createElement(`input`);
      inputLetter.setAttribute(`type`, `text`);
      inputLetter.setAttribute(`maxlength`, `1`);
      inputLetter.id = `try-${i + 1}-letter-${j + 1}`;
      tryDiv.appendChild(inputLetter);
    }

    guesses.appendChild(tryDiv);
  }
}

// Function to Handle the input box options and controls
function handleInputBoxes() {
  const tryies = Array.from(document.querySelectorAll(`.try`));

  for (let i = 0; i < tryies.length; i++) {
    if (i + 1 !== currentTry) {
      tryies[i].classList.add(`disabled`);
      const inputs = Array.from(tryies[i].querySelectorAll(`input`));
      inputs.forEach((input) => {
        input.disabled = true;
      });
    }
  }

  for (let i = 0; i < tryies.length; i++) {
    const inputs = Array.from(tryies[i].querySelectorAll("input"));

    inputs.forEach((input, index) => {
      input.addEventListener("input", (e) => {
        if (
          e.target.value &&
          index < inputs.length - 1 &&
          e.target.value !== " "
        ) {
          inputs[index + 1].focus();
        }
      });

      input.addEventListener("keydown", (e) => {
        // Prevent space character
        if (e.key === " ") {
          e.preventDefault();
          return;
        }
        // Handle Backspace
        if (e.key === "Backspace") {
          if (e.target.value === "" && index > 0) {
            inputs[index - 1].focus();
          } else {
            e.preventDefault();
            e.target.value = "";
            if (index > 0) inputs[index - 1].focus();
          }
        }
        // Handle Arrow Navigation
        if (e.key === "ArrowRight" && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
        if (e.key === "ArrowLeft" && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });
  }
}

function updateInputBoxes() {
  const tryies = Array.from(document.querySelectorAll(`.try`));
  const allInputs = Array.from(document.querySelectorAll(`.try input`));

  allInputs.forEach((input) => {
    input.disabled = true;
  });

  tryies[currentTry - 1].classList.remove(`disabled`);
  tryies[currentTry - 2].classList.add(`disabled`);

  // copy the correct input to the next input try
  const currentInputs = Array.from(
    tryies[currentTry - 1].querySelectorAll(`input`)
  );
  if (currentTry <= maxTryies && currentTry > 1) {
    currentInputs.forEach((input) => {
      input.disabled = false;
    });
    const pastInputs = Array.from(
      tryies[currentTry - 2].querySelectorAll(`input`)
    );
    const nextInputs = Array.from(
      tryies[currentTry - 1].querySelectorAll(`input`)
    );
    pastInputs.forEach((e, i) => {
      if (e.classList.contains(`correct`)) {
        nextInputs[i].disabled = true;
        nextInputs[i].classList.add("disabled", "correct");
        nextInputs[i].value = wordToGuess[i].toUpperCase();
      }
    });
  }

  // Focus on the first input of the current try
  if (currentTry <= maxTryies) {
    currentInputs[
      currentInputs.findIndex((e) => !e.classList.contains(`correct`))
    ].focus();
  }
}

// Handle Check Button
let checkButton = document.querySelector(`#check-button`);
checkButton.addEventListener(`click`, () => {
  const tryies = Array.from(document.querySelectorAll(`.try`));
  const currentRowBoxes = Array.from(
    tryies[currentTry - 1].querySelectorAll(`input`)
  );

  let correctGuess = true;
  currentRowBoxes.forEach((e, index) => {
    if (e.value.trim() === "") {
      correctGuess = false;
      e.classList.add("wrong");
      return; // skip to the next input
    }

    if (e.value.toLowerCase() === wordToGuess[index].toLowerCase()) {
      e.classList.add(`correct`);
      letters = letters.filter((letter) => letter !== e.value.toUpperCase());
    } else if (letters.includes(e.value.toLowerCase())) {
      e.classList.add(`semi-correct`);
      correctGuess = false;
    } else {
      e.classList.add(`wrong`);
      correctGuess = false;
    }
  });
  // Handle end of try And successflul guess
  guessResultDiv.innerHTML = "";
  if (correctGuess) {
    checkButton.disabled = true;
    hintButton.disabled = true;
    tryies[currentTry - 1].classList.add("disabled");
    currentRowBoxes.forEach((e) => {
      if (e.value.trim() === "") {
        e.classList.add("disabled");
        e.disabled = true;
      }
    });
    guessResultDiv.innerHTML = `Congratulations! the word: <span>${wordToGuess}</span>`;
  } else if (currentTry < maxTryies) {
    currentTry++;
    updateInputBoxes();
  } else {
    tryies[currentTry - 1].classList.add("disabled");
    currentRowBoxes.forEach((e) => {
      e.classList.add("disabled");
      e.disabled = true;
    });
    guessResultDiv.innerHTML = `Game Over! The correct word was: <span>${wordToGuess}</span>`;
  }
});

// Handle Hint Button
let hintButton = document.querySelector(`#hint-button`);
let hintSpan = hintButton.querySelector(`span`);
hintSpan.textContent = `(${hintsCount})`;

hintButton.addEventListener(`click`, () => {
  hintsCount--;
  hintSpan.innerHTML = `(${hintsCount})`;

  if (hintsCount < 0) {
    hintButton.disabled = true;
    return;
  } // No hints left

  // get current elements
  const currentRow = document.querySelectorAll(`.try`)[currentTry - 1];
  const currentInputs = Array.from(currentRow.querySelectorAll(`input`));

  // get not corrected inputs
  const emptyInputs = currentInputs.filter(
    (input) => !input.classList.contains(`correct`)
  );
  if (emptyInputs.length === 0) hintButton.disabled = true; // all letters are correct

  // select a random one to show
  let randomIndixFromEmpty = Math.floor(Math.random() * emptyInputs.length);
  let realindex = currentInputs.indexOf(emptyInputs[randomIndixFromEmpty]);

  // fill the place
  currentInputs[realindex].value = wordToGuess[realindex];
  currentInputs[realindex].classList.add("correct", "disabled");
  currentInputs[realindex].disabled = true;

  // all letters done
  if (emptyInputs.length === 1) {
    hintButton.disabled = true;
    checkButton.disabled = true;
    currentRow.classList.add("disabled");
    currentInputs.forEach((e) => {
      e.classList.add("disabled");
      e.disabled = true;
    });
    guessResultDiv.innerHTML = `Congratulations! the word: <span>${wordToGuess}</span>`;
  }
});

window.onload = () => {
  generateTries();
  handleInputBoxes();
};
