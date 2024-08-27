const inputText = document.querySelector(".input-text");
const resultText = document.querySelector(".result-text");

const noMessage = document.querySelector(".no-message");
const instructionText = document.querySelector(".instruction");
const placeholderImage = document.querySelector(".placeholder-image");
const copyBtn = document.querySelector(".copy-button");

const resultContainer = document.querySelector(".result-container");

resultContainer.classList.add("hidden");

function encryptText() {
    const text = inputText.value;
    const encrypted = encrypt(text);
    resultText.textContent = encrypted;
    updateUI(encrypted);
}

function decryptText() {
    const text = inputText.value;
    const decrypted = decrypt(text);
    resultText.textContent = decrypted;
    updateUI(decrypted);
}

function updateUI(text) {
    if (text) {
        noMessage.classList.add("hidden");
        instructionText.classList.add("hidden");
        placeholderImage.classList.add("hidden");
        resultContainer.classList.remove("hidden");
    } else {
        noMessage.classList.remove("hidden");
        instructionText.classList.remove("hidden");
        placeholderImage.classList.remove("hidden");
        resultContainer.classList.add("hidden");
    }
}

function encrypt(text) {
    const replacements = {
        a: 'ai',
        e: 'enter',
        i: 'imes',
        o: 'ober',
        u: 'ufat'
    };

    return text.split('').map(char => replacements[char] || char).join('');
}

function decrypt(text) {
    const replacements = {
        ai: 'a',
        enter: 'e',
        imes: 'i',
        ober: 'o',
        ufat: 'u'
    };

    let result = text;
    for (let [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(key, 'g');
        result = result.replace(regex, value);
    }

    return result;
}

function copyToClipboard() {
    const textToCopy = resultText.textContent;
    
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log("Texto copiado al portapapeles.");
        }).catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
    }
}

copyBtn.addEventListener("click", copyToClipboard);
