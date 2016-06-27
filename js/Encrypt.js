var Encrypt = {
	randomText: function (text){
		var charset = new Array();
		for (var i = 0; i < text.length; i++) {
			var emoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
			if(i != text.length - 1 && emoji.test(text.substr(i, 2))) {
				charset[charset.length] = text.substr(i, 2);
				i++;
			}
			else{
				charset[charset.length] = text.charAt(i);
			}
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
	},

	caesarCode: function (text, shift){
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
	},

	base64: function (text) {
		text = utf16to8(text);
		var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";   
	    var output = "";  
	    var chr1, chr2, chr3 = "";  
	    var enc1, enc2, enc3, enc4 = "";  
	    var i = 0;  
	    do {  
	        chr1 = text.charCodeAt(i++);  
	        chr2 = text.charCodeAt(i++);  
	        chr3 = text.charCodeAt(i++);  
	        enc1 = chr1 >> 2;  
	        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);  
	        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);  
	        enc4 = chr3 & 63;  
	        if (isNaN(chr2)) {  
	            enc3 = enc4 = 64;  
	        } else if (isNaN(chr3)) {  
	            enc4 = 64;  
	        }  
	        output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);  
	        chr1 = chr2 = chr3 = "";  
	        enc1 = enc2 = enc3 = enc4 = "";  
	    } while (i < text.length);  
	    return output;  
	},  

	aes_128_ecb: function (text, key){
		text = base64E(text);
		key = CryptoJS.enc.Hex.parse(CryptoJS.MD5(key).toString());
		var encryptedData = CryptoJS.AES.encrypt(plaintext, key, {
	        	mode: CryptoJS.mode.ECB,
	        	padding: CryptoJS.pad.Pkcs7,
	            format: CryptoJS.format.Hex
	    });
	    return base64E(encryptedData.ciphertext.toString());
	}
};
  
function utf16to8(str) {  
    var out, i, len, c;  
    out = "";  
    len = str.length;  
    for(i = 0; i < len; i++) {  
        c = str.charCodeAt(i);  
    if ((c >= 0x0001) && (c <= 0x007F)) {  
        out += str.charAt(i);  
    } else if (c > 0x07FF) {  
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));  
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
    } else {  
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));  
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
    }  
    }  
    return out;  
}