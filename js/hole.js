// JavaScript Document
function openurl(url){
	//window.location.href = 'hole:';
	window.location.href = url;
}

function turnToPage(pageid){
	var pages = document.getElementsByClassName("page");
	for (var i = pages.length - 1; i >= 0; i--) {
		pages[i].style.visibility = 'hidden';
	}
	//unselectablepage
	var uspages = document.getElementsByClassName("unselectable-page");
	for (var i = uspages.length - 1; i >= 0; i--) {
		uspages[i].style.visibility = 'hidden';
	}
	document.getElementById(pageid).style.visibility = 'visible';
}

// #region encrypt 
var plainText = "";
function setPlainText(){
	plainText = document.getElementById("plainText").textContent;
}

function passwordChange(){
	if (document.getElementById('aespassword').value.length > 0){
		document.getElementById('page-aes').getElementsByClassName('btn_next')[0].style.visibility = 'inherit';
	}
	else{
		document.getElementById('page-aes').getElementsByClassName('btn_next')[0].style.visibility = 'hidden';
	}
}

var selectedAlgorithmE = 0;
var result = "";
function setSelectedAlgorithmE(selection){
	switch(selection){
		case 0:
			turnToPage('page-randomText');
			break;
		case 1:
			turnToPage('page-caesar');
			break;
		case 2:
			result = Encrypt.base64(plainText);
			document.getElementById('result').textContent = result;
			turnToPage('page-result');
			break;
		case 3:
			result = Encrypt.morseCode(plainText);
			document.getElementById('result').textContent = result;
			turnToPage('page-result');
			break;
		case 4:
			result = Encrypt.dictionaryEncrypt(plainText, Encrypt.emojiDict);
			document.getElementById('result').textContent = result;
			turnToPage('page-result');
			break;
		case 5:
			turnToPage('page-aes');
		default:
			break;
	}
	selectedAlgorithmE = selection;
}

function plainTextInputChange(){
	if (document.getElementById('plainText').textContent.length > 0){
		document.getElementById('ph-plainText').style.visibility = 'hidden';
		document.getElementById('page-input').getElementsByClassName('btn_next')[0].style.visibility = 'visible';
	}
	else{
		document.getElementById('ph-plainText').style.visibility = 'inherit';
		document.getElementById('page-input').getElementsByClassName('btn_next')[0].style.visibility = 'hidden';
	}
}

function setRandomText(selection){
	switch(selection){
		case 0:
			result = Encrypt.randomText(plainText, null);
			document.getElementById('result').textContent = result;
			turnToPage('page-result');
			break;
		case 1:
			result = Encrypt.randomText(plainText, Encrypt.symbols);
			document.getElementById('result').textContent = result;
			turnToPage('page-result');
			break;
		default:
			var unit = document.getElementById('unit').value;
			if (unit.length > 0) {
				result = Encrypt.randomText(plainText, unit);
				document.getElementById('result').textContent = result;
				turnToPage('page-result');
			}
			else {
				result = Encrypt.randomText(plainText, null);
				document.getElementById('result').textContent = result;
				turnToPage('page-result');
			}
			break;
	}
}

function setCaesarConfigE(selection){
	switch(selection){
		case 0:
			result = Encrypt.caesarCode(plainText, Math.floor((Math.random() * 53) - 26));
			if (result != null){
				document.getElementById('result').textContent = result;
				turnToPage('page-result');
			}
			else{ alert("很抱歉\n加密失败！"); }
			break;
		case 1:
			var shift = parseInt(document.getElementById('shift').value);
			if (isNaN(shift)) {alert("请输入数字");}
			else {
				result = Encrypt.caesarCode(plainText, shift);
				document.getElementById('result').textContent = result;
				turnToPage('page-result');
			}
			break;
		default:
			var shift = parseInt(document.getElementById('shift').value);
			if (isNaN(shift)) {
				result = Encrypt.caesarCode(plainText, Math.floor((Math.random() * 53) - 26));
				if (result != null){
					document.getElementById('result').textContent = result;
					turnToPage('page-result');
				}
				else{ alert("很抱歉\n加密失败！"); }
			}
			else {
				result = Encrypt.caesarCode(plainText, shift);
				document.getElementById('result').textContent = result;
				turnToPage('page-result');
			}
			break;
	}
}


function setAESConfig(isEncrypt){
	if (isEncrypt){
		result = Encrypt.aes_128_ecb(plainText, document.getElementById('aespassword').value);
		document.getElementById('result').textContent = result;
	}
	else{
		result = Decrypt.aes_128_ecb(cypherText, document.getElementById('aespassword').value);
		document.getElementById('result').textContent = result;
	}
	turnToPage('page-result');
}

// #region decrypt 

var cypherText = "";
function setCypherText(){
	cypherText = document.getElementById("cypherText").textContent;
}

var selectedAlgorithmD = 0;
var resultD = "";
function setSelectedAlgorithmD(selection){
	switch(selection){
		case 0:
			turnToPage('page-caesar');
			break;
		case 1:
			resultD = Decrypt.base64(cypherText);
			if (resultD != null){
				document.getElementById('result').textContent = resultD;
				turnToPage('page-result');
			}
			else{
				alert("很抱歉\n解密失败！");
			}
			break;
		case 2:
			result = Decrypt.morseCode(cypherText);
			document.getElementById('result').textContent = result;
			turnToPage('page-result');
			break;
		case 3:
			result = Decrypt.dictionaryEncrypt(cypherText, Decrypt.emojiDict);
			document.getElementById('result').textContent = result;
			turnToPage('page-result');
			break;
		case 4:
			turnToPage('page-aes');
			break;
		default:
			break;
	}
	selectedAlgorithmD = selection;
}

function cypherTextInputChange(){
	if (document.getElementById('cypherText').textContent.length > 0){
		document.getElementById('ph-cypherText').style.visibility = 'hidden';
		document.getElementById('page-input').getElementsByClassName('btn_next')[0].style.visibility = 'visible';
	}
	else{
		document.getElementById('ph-cypherText').style.visibility = 'inherit';
		document.getElementById('page-input').getElementsByClassName('btn_next')[0].style.visibility = 'hidden';
	}
}

function setCaesarConfigD(selection){
	switch(selection){
		case 0:
			result = Decrypt.caesarCode(cypherText, Math.floor((Math.random() * 53) - 26));
			if (result != null){
				document.getElementById('result').textContent = result;
				turnToPage('page-result');
			}
			else{ alert("很抱歉\n解密失败！"); }
			break;
		case 1:
			var shift = parseInt(document.getElementById('shift').value);
			if (isNaN(shift)) {alert("请输入数字");}
			else {
				result = Decrypt.caesarCode(cypherText, shift);
				document.getElementById('result').textContent = result;
				turnToPage('page-result');
			}
			break;
		default:
			var shift = parseInt(document.getElementById('shift').value);
			if (isNaN(shift)) {
				result = Decrypt.caesarCode(cypherText, Math.floor((Math.random() * 53) - 26));
				if (result != null){
					document.getElementById('result').textContent = result;
					turnToPage('page-result');
				}
				else{ alert("很抱歉\n解密失败！"); }
			}
			else {
				result = Decrypt.caesarCode(cypherText, shift);
				document.getElementById('result').textContent = result;
				turnToPage('page-result');
			}
			break;
	}
}