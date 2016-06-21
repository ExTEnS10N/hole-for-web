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

function caesarCode(text, shift){
	var cypherText = "";
	var lalpha = "abcdefghijklmnopqrstuvwxyz";
	var ualpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (var i = 0; i < text.length; i++) {
		var lindex = lalpha.indexOf(text.charAt(i));
		if (lindex >= 0){
			var shiftIndex = (shift + lindex) % 26;
			if(shiftIndex < 0)
			{
				shiftIndex += 26;
			}
			cypherText += lalpha.charAt(shiftIndex);
			continue;
		}
		var uindex = ualpha.indexOf(text.charAt(i));
		if(uindex >= 0){
			var shiftIndex = (shift + uindex) % 26;
			if(shiftIndex < 0)
			{
				shiftIndex += 26;
			}
			cypherText += ualpha.charAt(shiftIndex);
			continue;
		}
		cypherText += text.charAt(i);
	}
	return cypherText;
}