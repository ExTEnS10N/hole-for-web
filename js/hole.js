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
	plainText = document.getElementById("plainText").innerHTML;
}

var selectedAlgorithmE = 0;
var resultE = "";
function setSelectedAlgorithmE(selection){
	switch(selection){
		case 0:
			resultE = randomText(plainText);
			document.getElementById('result').innerHTML = resultE;
			turnToPage('page-result');
			break;
		case 1:
			turnToPage('page-caesar');
			break;
		case 2:
			resultE = window.atob(plainText);
			document.getElementById('result').innerHTML = resultE;
			turnToPage('page-result');
			break;
		case 3:
		case 4:
		case 5:
		default:
			break;
	}
	selectedAlgorithmE = selection;
}

function plainTextInputChange(){
	if (document.getElementById('plainText').innerHTML.length > 0){
		document.getElementById('ph-plainText').style.visibility = 'hidden';
		document.getElementById('page-input').getElementsByClassName('btn_next')[0].style.visibility = 'visible';
	}
	else{
		document.getElementById('ph-plainText').style.visibility = 'inherit';
		document.getElementById('page-input').getElementsByClassName('btn_next')[0].style.visibility = 'hidden';
	}
}

function setCaesarConfigE(selection){
	switch(selection){
		case 0:
			resultE = caesarCode(plainText, Math.floor((Math.random() * 53) - 26));
			if (resultE != null){
				document.getElementById('result').innerHTML = resultE;
				turnToPage('page-result');
			}
			else{ alert("很抱歉\n加密失败！"); }
			break;
		case 1:
			var shift = parseInt(document.getElementById('shift').value);
			if (isNaN(shift)) {alert("请输入数字");}
			else {
				resultE = caesarCode(plainText, shift);
				document.getElementById('result').innerHTML = resultE;
				turnToPage('page-result');
			}
			break;
		default:
			var shift = parseInt(document.getElementById('shift').value);
			if (isNaN(shift)) {
				resultE = caesarCode(plainText, Math.floor((Math.random() * 53) - 26));
				if (resultE != null){
					document.getElementById('result').innerHTML = resultE;
					turnToPage('page-result');
				}
				else{ alert("很抱歉\n加密失败！"); }
			}
			else {
				resultE = caesarCode(plainText, shift);
				document.getElementById('result').innerHTML = resultE;
				turnToPage('page-result');
			}
			break;
	}
}

// #region decrypt 

var cypherText = "";
function setCypherText(){
	cypherText = document.getElementById("cypherText").innerHTML;
}

var selectedAlgorithmD = 0;
var resultD = "";
function setSelectedAlgorithmD(selection){
	switch(selection){
		case 0:
			turnToPage('page-caesar');
			break;
		case 1:
			resultD = window.btoa(plainText);
			if (resultD != null){
				document.getElementById('result').innerHTML = resultD;
				turnToPage('page-result');
			}
			else{
				alert("很抱歉\n解密失败！");
			}
			break;
		case 2:
		case 3:
		case 4:
		case 5:
		default:
			break;
	}
	selectedAlgorithmD = selection;
}

function cypherTextInputChange(){
	if (document.getElementById('cypherText').innerHTML.length > 0){
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
			resultE = caesarCode(cypherText, Math.floor((Math.random() * 53) - 26));
			if (resultE != null){
				document.getElementById('result').innerHTML = resultE;
				turnToPage('page-result');
			}
			else{ alert("很抱歉\n加密失败！"); }
			break;
		case 1:
			var shift = parseInt(document.getElementById('shift').value);
			if (isNaN(shift)) {alert("请输入数字");}
			else {
				resultE = caesarCode(cypherText, shift);
				document.getElementById('result').innerHTML = resultE;
				turnToPage('page-result');
			}
			break;
		default:
			var shift = parseInt(document.getElementById('shift').value);
			if (isNaN(shift)) {
				resultE = caesarCode(cypherText, Math.floor((Math.random() * 53) - 26));
				if (resultE != null){
					document.getElementById('result').innerHTML = resultE;
					turnToPage('page-result');
				}
				else{ alert("很抱歉\n加密失败！"); }
			}
			else {
				resultE = caesarCode(cypherText, shift);
				document.getElementById('result').innerHTML = resultE;
				turnToPage('page-result');
			}
			break;
	}
}