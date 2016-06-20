function randomText(text){
	var charset = new Array()
	for (var i = 0; i < text.length; i++) {
		charset[i] = text.charAt(i);
	}
	var cypherText = "";
	var k = new Array();
	while (charset.length > 0){
		var j = Math.floor(Math.random() * charset.length);
		k[text.length - charset.length] = j;
		cypherText += charset[j];
		charset.splice(j, 1);
	}
	return cypherText;
}
