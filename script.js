let currentMode = 'encrypt';

function setMode(mode) {
    currentMode = mode;
    document.getElementById('btnEncrypt').classList.toggle('active', mode === 'encrypt');
    document.getElementById('btnDecrypt').classList.toggle('active', mode === 'decrypt');
    process(); 
}

function updateUI() {
    // [SEC-REF-001]
    const method = document.getElementById('method').value;
    const isAtbash = (method === 'atbash');
    
    document.getElementById('shift').style.visibility = isAtbash ? 'hidden' : 'visible';
    
    const btnD = document.getElementById('btnDecrypt');
    const btnE = document.getElementById('btnEncrypt');

    if (isAtbash) {
        btnE.innerText = "PROCESO SIMÉTRICO";
        btnE.classList.add('active');
        btnD.style.display = 'none';
    } else {
        btnE.innerText = "Cifrar";
        btnD.style.display = 'inline-block';
        setMode(currentMode);
    }
    process();
}

function process() {
    const inputField = document.getElementById('inputText');
    const charsetField = document.getElementById('charset');
    
    // [SEC-REF-002]
    let rawCharset = charsetField.value.toUpperCase();
    let uniqueCharset = [...new Set(rawCharset)].join('');
    
    if (charsetField.value !== uniqueCharset) {
        charsetField.value = uniqueCharset;
    }

    const text = inputField.value.toUpperCase();
    inputField.value = text;

    const method = document.getElementById('method').value;
    const shift = parseInt(document.getElementById('shift').value) || 0;
    const n = uniqueCharset.length;
    let output = "";

    if (n === 0) {
        document.getElementById('result').innerText = text;
        return;
    }

    for (let char of text) {
        const index = uniqueCharset.indexOf(char);
        
        if (index === -1) {
            // [SEC-REF-003]
            output += char;
            continue;
        }

        if (method === 'cesar') {
            // [SEC-REF-004]
            let move = (currentMode === 'encrypt') ? shift : -shift;
            let newIndex = (index + move) % n;
            if (newIndex < 0) newIndex += n; 
            output += uniqueCharset[newIndex];
        } 
        else if (method === 'atbash') {
            // [SEC-REF-005]
            output += uniqueCharset[(n - 1) - index];
        }
    }
    document.getElementById('result').innerText = output;
}

// [SEC-REF-006]
try { updateUI(); } catch(e) {}