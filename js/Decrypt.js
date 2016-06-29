var Decrypt = {
    emojiDict: {
        "😄": "a", "😁": "b", "😂": "c", "😃": "d", "😄": "e", "😅": "f", "😆": "g", "😇": "h",
        "😈": "i", "👿": "j", "😉": "k", "😊": "l", "☺️": "m", "😋": "n", "😌": "o", "😍": "p", 
        "😎": "q", "😏": "r", "😐": "s", "😑": "t", "😒": "u", "😓": "v", "😔": "w", "😕": "x", 
        "😖": "y", "😗": "z",
            
        "😘": "~", "😙": "!", "😚": "@", "😛": "#", "😜": "$", "😝": "%", "😞": "^", "😟": "&",
        "😠": "*", "😡": "(", "😢": ")", "😣": "_", "😤": "+", "😥": "`", "😦": "-", "😧": "=",
        "😨": "{", "😩": "}", "😪": "|", "😫": "[", "😬": "]", "😭": "\\", "😮": ":", "😯": "\"",
        "😰": ";", "😱": "'", "😲": "<", "😳": ">", "😴": "?", "😵": ",", "😶": ".", "😷": "/",
        "🖐": " ",

        "😸": "A", "😹": "B", "😻": "C", "😼": "D", "😽": "E", "🙀": "F", "😿": "G", "😾": "H",
        "🙌": "I", "👏": "J", "👋": "K", "👍": "L", "👊": "M", "✊": "N", "✌️": "O", "👌": "P",
        "✋": "Q", "👐": "R", "💪": "S", "🙏": "T", "☝️": "U", "👆": "V", "👇": "W", "👈": "X",
        "👉": "Y", "🖕": "Z"
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
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";  
        var chr1, chr2, chr3 = "";  
        var enc1, enc2, enc3, enc4 = "";  
        var i = 0;  
        if (text.length % 4 != 0) {  
            return "";  
        }  
        var base64test = /[^A-Za-z0-9\+\/\=]/g;  
        if (base64test.exec(text)) {  
            return "";  
        }  
        do {  
            enc1 = keyStr.indexOf(text.charAt(i++));  
            enc2 = keyStr.indexOf(text.charAt(i++));  
            enc3 = keyStr.indexOf(text.charAt(i++));  
            enc4 = keyStr.indexOf(text.charAt(i++));  
            chr1 = (enc1 << 2) | (enc2 >> 4);  
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);  
            chr3 = ((enc3 & 3) << 6) | enc4;  
            output = output + String.fromCharCode(chr1);  
            if (enc3 != 64) {  
                output += String.fromCharCode(chr2);  
            }  
            if (enc4 != 64) {  
                output += String.fromCharCode(chr3);  
            }  
            chr1 = chr2 = chr3 = "";  
            enc1 = enc2 = enc3 = enc4 = "";  
        } while (i < text.length);  
        return utf8to16(output);  
    },

    dictionaryEncrypt: function(text, dict){
        var cypherText = "";

        for (var i = 0; i < text.length; i++) {
            var emoji = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
            var achar = '';
            if(i != text.length - 1 && emoji.test(text.substr(i, 2))) {
                achar = text.substr(i, 2);
                i++;
            }
            else{ achar = text.charAt(i); }

            var found = false;
            for (var key in dict) {
                if (key == achar){
                    cypherText += dict[achar];
                    found = true;
                    break;
                }
            }
            if (!found) {cypherText += achar;}
        }
        return cypherText;
    },

    aes_128_ecb: function (text, key){
        text = CryptoJS.enc.Hex.parse(this.base64(text));
        key = CryptoJS.enc.Hex.parse(CryptoJS.MD5(key).toString());
        var decryptedData = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(text), key, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            });
        return decryptedData.toString(CryptoJS.enc.Utf8);
    }
};

function utf8to16(str) {  
    var out, i, len, c;  
    var char2, char3;  
    out = "";  
    len = str.length;  
    i = 0;  
    while(i < len) {  
        c = str.charCodeAt(i++);  
        switch(c >> 4) {  
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:  
                out += str.charAt(i-1);  
                break;  
            case 12: case 13: 
                char2 = str.charCodeAt(i++);  
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));  
                break;  
            case 14:
                char2 = str.charCodeAt(i++);  
                char3 = str.charCodeAt(i++);  
                out += String.fromCharCode(((c & 0x0F) << 12) |  
                ((char2 & 0x3F) << 6) |  
                ((char3 & 0x3F) << 0));  
                break;  
        }  
    }  
    return out;  
}
