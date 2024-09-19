/**
 * Elementos do DOM
 */
const icoReload      = document.getElementById("icoReload");
const inpPassword    = document.getElementById("inpPassword");
const inpCount       = document.getElementById("inpCount");
const spanCount      = document.getElementById("range-value");
const arrRdStyle     = document.getElementsByClassName("rdStyle");
const arrChkAlphabet = document.getElementsByClassName("chkAlphabet");
const btnCopy        = document.getElementById("icoCopy");
const btnVisibility  = document.getElementById("icoHidden");
const classifier     = document.getElementById("classifier");
const display        = document.getElementById("section-display");
const secGenerator   = document.getElementById("section-generator");
const secPassword    = document.getElementById("section-password");
const secDocument    = document.getElementById("section-document");
const secPhone       = document.getElementById("section-phone");
const selectPassword = document.getElementById("select-password");
const selectDocument = document.getElementById("select-document");
const selectPhone    = document.getElementById("select-phone");


/**
 * Selecionar qual o Gerador atual
 */
const setGeneratorIdentity = (elem) => {
    const selected = document.querySelector("#section-generator .selected");
    selected.classList.remove("selected");
    elem.classList.add("selected");
}
const selectGeneratorColor = (elem) => {
    const selected = document.querySelector("#section-select .selected");
    selected.classList.remove("selected");
    elem.classList.add("selected");
}

const reloadGeneratorSelected = () => {
    const selected = document.querySelector("#section-select .selected");
    const type = selected.dataset.type;
    icoReload.dataset.selected = type;
}
selectPassword.onclick = () => {
    selectGeneratorColor(selectPassword);
    setGeneratorIdentity(secPassword);
    reloadGeneratorSelected();
    reloadInput();
}
selectDocument.onclick = () => {
    selectGeneratorColor(selectDocument);
    setGeneratorIdentity(secDocument);
    reloadGeneratorSelected();
    reloadInput();
}
selectPhone.onclick = () => {
    selectGeneratorColor(selectPhone);
    setGeneratorIdentity(secPhone);
    reloadGeneratorSelected();
    reloadInput();
}



/**
 * Parâmetros de Geração da Senha
 */
let minor   = true;
let major   = true; 
let numbers = true; 
let symbols = true;
let style   = 1;
let count   = 16;
let password = "";

/**
 * Verifica a força da senha, e atribui a cor para
 * a TAG classificadora de acordo
 * 
 * Forte :: Possui 3 Alfabetos Diferentes || >32 caracteres
 * Medio :: Possui 2 Alfabetos Diferentes || >16 caracteres
 * Fraco :: Possui 1 Alfabeto             || <16 caracteres
 */
const checkPasswordStrength = () => {
    let qtdeAlfabetos = 0;
    // No Javascript TRUE = 1 e FALSE = 0
    qtdeAlfabetos += minor
    qtdeAlfabetos += major
    qtdeAlfabetos += numbers
    qtdeAlfabetos += symbols

    if(password.length >= 32 || (password.length >= 16 && qtdeAlfabetos >= 3)) {
        classifier.style.backgroundColor = "#00FF00";
    } else if (password.length >= 16 || (password.length >= 8 && qtdeAlfabetos >= 2)) {
        classifier.style.backgroundColor = "#FFFF00";
    } else {
        classifier.style.backgroundColor = "#FF0000";
    }
}

/**
 * Gera a senha a partir dos parâmetros definidos
 */
const generatePassword = () => {
    // Definição dos alfabetos
    const alphabetMinor   = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    const alphatbetMajor  = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const alphabetNumbers = ["0","1","2","3","4","5","6","7","8","9"]
    const alphabetSymbols = ["!","@","#","$","%","&","*","(",")","/","-","_","[","]","=","+",">","<"]

    let usedAlphabet = [];

    /**
     * Monta o alfabeto utilizado de acordo com os parametros
     */
    if(minor) { 
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphabetMinor); 
    }
    if(major) { 
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphatbetMajor); 
    }
    if(numbers) { 
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphabetNumbers); 
    }
    if(symbols) { 
        usedAlphabet = usedAlphabet.concat(usedAlphabet, alphabetSymbols); 
    }


    /**
     * Caso os parametros sejam validos, itera pela quantidade de caracteres esperada
     */
    let pwd = "";
    for(let i = 0; i < count && (usedAlphabet.length > 0); i++) {
        // Seleciona um elemento do alfabeto disponivel
        let character = usedAlphabet[Math.floor(Math.random() * usedAlphabet.length)]

        // No modo de acessibilidade, evita escolher caracteres ambíguos (facilmente confundidos)
        while(style == 2 && ["I","l","1","0","o","O"].includes(character)) {
            character = usedAlphabet[Math.floor(Math.random() * usedAlphabet.length)];
        }

        // Concatena o caractere escolhido
        pwd += character;
    }

    // Define a senha e avalia sua força
    password = pwd;
    inpPassword.value = password;
    checkPasswordStrength();
}

/**
 * Copia a senha
 */
const copyPassword = () => {
    navigator.clipboard.writeText(inpPassword.value);
}

/**
 * Toggle visibilidade do input
 */
const visibilityPassword = () => {
    const visibility = btnVisibility.dataset.hidden;

    if(visibility == "hidden") {
        display.dataset.hidden = "visible"
        btnVisibility.dataset.hidden = "visible" 
        return
    }

    display.dataset.hidden = "hidden"
    btnVisibility.dataset.hidden = "hidden"  
}

/**
 * INPUT do Seletor de Quantidade de Caracteres
 * (Atualiza o contador e gera uma nova senha)
 */
inpCount.oninput = () => {
    count = inpCount.value
    spanCount.innerHTML = ` = ${count}`;
    generatePassword()
};

/**
 * Atribui os inputs nos RadioButtons de Estilo
 * (Atualiza o estilo e gera uma nova senha)
 */
for(let i = 0; i<arrRdStyle.length; i++){
    const rdStyle = arrRdStyle[i];
    rdStyle.oninput = () => {
        style = rdStyle.value;
        generatePassword()
    }
}

/**
 * Atribui os inputs nos CheckBoxes de Alfabeto
 * (Atualiza o alfabeto e gera uma nova senha)
 */
for(let i = 0; i<arrChkAlphabet.length; i++){
    const chkAlphabet = arrChkAlphabet[i];

    chkAlphabet.oninput = () => {
        if(chkAlphabet.id === "minor") {
            minor = chkAlphabet.checked;
        }
        if(chkAlphabet.id === "major") {
            major = chkAlphabet.checked;
        }
        if(chkAlphabet.id === "numbers") {
            numbers = chkAlphabet.checked;
        }
        if(chkAlphabet.id === "symbols") {
            symbols = chkAlphabet.checked;
        }
        generatePassword();

        if(password == "") {
            chkAlphabet.checked = !chkAlphabet.checked;
            chkAlphabet.dispatchEvent(new Event('input'));
        }
    }
}

/**
 * Ao clicar no icone de Recarregar, gera uma nova senha
 */
const reloadInput = () => {
    const selected = icoReload.dataset.selected;
    switch (selected) {
        case 'password':
            generatePassword();
            break;
        case 'phone':
            generatePhone()
            break;
        case 'document':
            generateDocument()
            break;
        default:
            generatePassword();
    }
}
icoReload.onclick = () => {
    reloadInput();   
}

/**
 * Ao clicar no botao de Copiar, copia a senha para a area de transferencia
 */
btnCopy.onclick = () => {
    copyPassword();
}

/**
 * Ao clicar no botao de Visibilidade, deixa visivel as informações na area de transferência
 */
btnVisibility.onclick = () => {
    visibilityPassword();
}

/**
 * Ao carregar a tela, gera a primeira senha com os parâmetros default
 */
window.onload = () => {
    reloadInput();

    const selected = document.querySelector("#section-select .selected");
    selected.click();
}

// Telefone\
function generatePhone() {
    const numCharacters = document.getElementById('num-caracteres').value;
    const phoneType = document.getElementById('tipo-telefone').value;
    
    let number = '';
    if (phoneType === 'celular') {
        number = '9' + generateRandomDigits(numCharacters - 1);
    } else {
        number = generateRandomDigits(numCharacters);
    }

    applyResultPhone(number);
}

function generateRandomDigits(digits) {
    let numbers = '';
    for (let i = 0; i < digits; i++) {
        numbers += Math.floor(Math.random() * 10);
    }
    return numbers;
}

function applyMaskPhone(number, phoneType) {
    const numCharacters = document.getElementById('num-caracteres').value;

    if (phoneType === 'celular' && numCharacters == 9) {
        return `(${generateRandomDigits(2)}) ${number.substring(0, 5)}-${number.substring(5)}`;
    } else {
        return `(${generateRandomDigits(2)}) ${number.substring(0, 4)}-${number.substring(4)}`;
    }
}

function applyResultPhone(number) {
    const mask = document.getElementById('mascara').checked;
    const phoneType = document.getElementById('tipo-telefone').value;

    if (mask) {
        number = applyMaskPhone(number, phoneType);
    }

    inpPassword.value = number;
}

document.getElementById('mascara').addEventListener('change', () => {
    const currentNumber = inpPassword.value.replace(/\D/g, ''); 
    if (currentNumber) {
        applyResultPhone(currentNumber);
    }
});

document.getElementById('num-caracteres').addEventListener('change', generatePhone);
document.getElementById('tipo-telefone').addEventListener('change', generatePhone);


// CPF e CNPJ
function generateDocument() {
    const documentType = document.getElementById('document-type').value;
    let documentNumber = '';

    if (documentType === 'cpf') {
        documentNumber = generateCpf();
    } else if (documentType === 'cnpj') {
        documentNumber = generateCnpj();
    }

    applyResultDocument(documentNumber);
}

function generateCpf() {
    let cpf = '';
    for (let i = 0; i < 9; i++) {
        cpf += Math.floor(Math.random() * 10);
    }
    cpf += calculateCpfDigits(cpf);
    return cpf;
}

function calculateCpfDigits(cpf) {
    let sum = 0, rest;
    // Calculate first digit
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    let digit1 = rest;

    // Calculate second digit
    sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    sum += digit1 * 2;
    rest = (sum * 10) % 11;
    if (rest === 10 || rest === 11) rest = 0;
    let digit2 = rest;

    return digit1.toString() + digit2.toString();
}

function generateCnpj() {
    let cnpj = '';
    for (let i = 0; i < 12; i++) {
        cnpj += Math.floor(Math.random() * 10);
    }
    cnpj += calculateCnpjDigits(cnpj);
    return cnpj;
}

function calculateCnpjDigits(cnpj) {
    let weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0, rest;
    // Calculate first digit
    for (let i = 0; i < 12; i++) {
        sum += parseInt(cnpj.charAt(i)) * weights1[i];
    }
    rest = (sum % 11);
    let digit1 = (rest < 2) ? 0 : 11 - rest;

    cnpj += digit1;

    // Calculate second digit
    sum = 0;
    for (let i = 0; i < 13; i++) {
        sum += parseInt(cnpj.charAt(i)) * weights2[i];
    }
    rest = (sum % 11);
    let digit2 = (rest < 2) ? 0 : 11 - rest;

    return digit1.toString() + digit2.toString();
}

function applyMaskDocument(documentNumber, documentType) {
    if (documentType === 'cpf') {
        return documentNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (documentType === 'cnpj') {
        return documentNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
}

function applyResultDocument(documentNumber) {
    const mask = document.getElementById('mask').checked;
    const documentType = document.getElementById('document-type').value;

    if (mask) {
        documentNumber = applyMaskDocument(documentNumber, documentType);
    }

    inpPassword.value = documentNumber;
}

document.getElementById('mask').addEventListener('change', () => {
    const currentDocument = inpPassword.value.replace(/\D/g, '');
    if (currentDocument) {
        applyResultDocument(currentDocument);
    }
});

document.getElementById('document-type').addEventListener('change', generateDocument);
