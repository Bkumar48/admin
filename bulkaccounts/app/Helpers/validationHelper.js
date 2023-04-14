var validateEmail = function(text) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(text)
};

var validatePassword = function (text){
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]{0,1}.*$).{8}$/;
    return re.test(text)

};

var validatePhone = function (text, minDigitsCount, maxDigitsCount ){
    var str = text.trim();
    if (str) {
        var len,
            isPlus = ("+" === str[0]),
            defMin = isPlus ? 11 : 10, // 10 digits is standard w/o country code for the US, Canada and many other countries. 
            defMax = isPlus ? 14 : 11; // 11 digits maximum w/o country code (China) or 14 with country code (Austria).

        if ((str = str.match(/\d/g)) && (str = str.join(""))) { // all digits only!
            len = str.length;
          //   return str;
            return len >= (minDigitsCount || defMin) &&
                 len <= (maxDigitsCount || defMax);
        }
    }

}
var phoneDigit = function(text){
    var re = /^\d{10}$/;
    return re.test(text)
}

var alphabet = function (text){
    var re = /^[A-Za-z]+$/;
    return re.test(text)

};



module.exports = {validateEmail, validatePassword, validatePhone, phoneDigit, alphabet }