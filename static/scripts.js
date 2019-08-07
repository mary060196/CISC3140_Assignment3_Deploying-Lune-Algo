// This function returns the integer part of a division procedure (integer division):
function intDiv (divided, divisor)
{
    return Math.floor (divided / divisor);
}

// The following function finds the name of the company based on the first digits of the number
//	(if there is such company, and if string of digits is not empty).
// There is an alternative ability to implement this function with regular expressions instead of
//	conditionals, but the latter were used here for readability and convenience (a single
//	regular expression that checks and filters all these criteria will probably occupy 1/2
//	page, which is quite hard to read, while the following 'if-else-if' function shows how
//	different options are processed, character by character, until they fall under a particular
//	condition.
// Notice that several credit card patterns (such as 62, 54-55, 5019) match the pattern of more
//	than one company, so (since no more information besides what is on the website
//	https://baymard.com/checkout-usability/credit-card-patterns is given) the returned
//	string will contain the names of all these matching companies.
// However, if the number begins with 6011, it will be recognized as discover (despite the conflict
//	with Maestro that has 600000‑699999 as beginning characters.) Also, the numbers
//	4026, 417500, 4405, 4508, 4844, 4913, 4917 of Visa Electron and 4903, 4905, 4911, 
//	4936 of Switch will be recognized as such, respectively, despite the conflict with
//	the Visa beginning digit 4. All other conflicts will result in the display of all their
//	names within the message area in the browser, each separated by the forward slash '/'.
// In the specific case of the digits 62, there is a conflict in the masking pattern of the 19-digit
//	-long number (either (6-13) or (4-4-4-4-3)), so due to lack of knowledge, the pattern
//	(4-4-4-4-3) was chosen.
// The website https://baymard.com/checkout-usability/credit-card-patterns
//	also gives a list for patterns for perhaps retired card numbers. All these patterns were 
//	incorporated into the program as well, for convenience. Please, try these patterns out!
//	If there is a numerical conflict, all companies will be displays (such as Maestro and Switch
//	if the number of the card begins with 6333), unless the specific length of the number will
//	only belong to one of the companies (such as 19-digit number that begins with 6333;
//	according to all criteria, it can belong only to Maestro, since Switch has no 19 -digit
//	pattern.
// Some other websites (such as https://www.freeformatter.com/credit-card-number-generator-validator.html)
//	give fake examples of Visa, Discover and JCB cards of 19-digits-long, which are not encountered
//	by other websites (the usual number of digits for the cards of these companies is exactly 16).
//	Hence, this program will allow patterns for both 16 and 19 digits for these companies.
// Finally, a word about some of the code lines below. The code 
//	              intDiv (222100, Math.pow (10, 6 - str.length)) == numInStr
//	means "check if the number 'numInStr' is one of 2, 22, 222, 2221, 22210 or 222100". If we change the
//	equality sign to some inequality sign, we will be checking if 'numInStr' is greater or smaller than the
//	number that results by chopping off the digits of 222100 from the right (integer division), such that
//	this resulting number has the same number of digits as 'numInStr'. We use this technique to check if
//	a card number begins (or seems to begin) as a number of a specific company. Sometimes instead, we
//	check for particular digits at some locations (str[0] --> the most dominant digit, str[1] --> the second
//	most dominant digit, etc.)
function companyName (str)
{
    var numInStr = parseInt(str);
    if (str.length == 0)
         return ""; // Return an empty
    else if (str[0] == '0')
         return "✖    No Company!";
    else if (str[0] == '1') // If the 1st digit is 1, the card is made by UATP.
         return "✔    UATP";
    else if (str[0] == '2')
    {
          if (str.length == 1)
               return "✔    MasterCard / Diners Club enRoute";
          else if (str.length <= 6 && (intDiv (222100, Math.pow (10, 6 - str.length)) <= numInStr) && (intDiv(272099, Math.pow (10, 6 - str.length)) >= numInStr) ||
                      str.length > 6 && (222100 * Math.pow (10, str.length - 6) <= numInStr) && (272100 * Math.pow (10, str.length - 6) > numInStr))
              return "✔    MasterCard";
          else if (str.length < 4 && (intDiv (2014, Math.pow (10, 4 - str.length)) <= numInStr) && (intDiv (2015, Math.pow (10, 4 - str.length)) >= numInStr) || 
                      str.length >= 4 && (2014 * Math.pow (10, str.length - 4) <= numInStr) && (2015 * Math.pow (10, str.length - 4) > numInStr))
              return "✔    Diners Club enRoute";
          else if (str.length < 4 && (intDiv (2149, Math.pow (10, 4 - str.length)) <= numInStr) && (intDiv (2149, Math.pow (10, 4 - str.length)) >= numInStr) || 
                      str.length >= 4 && (2149 * Math.pow (10, str.length - 4) <= numInStr) && (2150 * Math.pow (10, str.length - 4) > numInStr))
              return "✔    Diners Club enRoute";
          else
              return "✖    No Company!";
    }
    else if (str[0] == '3')
    {
           if (str.length == 1)
                 return "✔    American Express / Diners Club (Carte Blanche) / Diners Club (Int’l) / JCB";
           else if (parseInt(str[1]) > 0 && parseInt(str[1]) < 4)
                 return "✖    No Company!";
           else if (str[1] == '0')
           {
                 if (str.length == '2')
                     return "✔    Diners Club (Carte Blanche) / Diners Club (Int’l)";
                 else if (parseInt(str[2]) >= 0 && parseInt(str[2]) <= 5)
                     return "✔    Diners Club (Carte Blanche) / Diners Club (Int’l)";
                 else if (str[2] == '9')
                     return "✔    Diners Club (Int’l)";
                 else
                     return "✖    No Company!";
            }
            else if (str[1] == '4' || str[1] == '7')
                   return "✔    American Express";
            else if (str[1] == '6' || str[1] == '8' || str[1] == '9')
                   return "✔    Diners Club (Int’l)";
            else if (str[1] == '5')
            {
                   if (str.length <= 4 && (intDiv (3528,Math.pow (10, 4 - str.length)) <= numInStr) && (intDiv (3589,Math.pow (10, 4 - str.length)) >= numInStr) ||
                        str.length > 4 && (3528 * Math.pow (10, str.length - 4) <= numInStr) && (3590 * Math.pow (10, str.length - 4) > numInStr))
                         return "✔    JCB";
                   else
                         return "✖    No Company!";
             }
             else // str[1] == '2' 
                  return "✖    No Company!";
    }
    else if (str[0] == '4')
    {
         if (str.length == 1)
             return "✔    Visa / Visa Electron / Switch";
         else if (str[1] != 9 && str.length < 4 &&
                     (intDiv(4026, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4027, Math.pow (10, 4 - str.length)) >= numInStr ||
                      intDiv(4405, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4406, Math.pow (10, 4 - str.length)) >= numInStr ||
                      intDiv(4508, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4509, Math.pow (10, 4 - str.length)) >= numInStr ||
                      intDiv(4844, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4845, Math.pow (10, 4 - str.length)) >= numInStr ||
                      intDiv(4175, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4176, Math.pow (10, 4 - str.length)) >= numInStr))
             return "✔    Visa / Visa Electron";
         else if (str.length < 4)
         {
                 if (intDiv(4911, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4912, Math.pow (10, 4 - str.length)) >= numInStr)
                       return "✔    Visa / Visa Electron / Switch";
                 else if (intDiv(4913, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4914, Math.pow (10, 4 - str.length)) >= numInStr ||
                             intDiv(4917, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4918, Math.pow (10, 4 - str.length)) >= numInStr)
                        return "✔    Visa / Visa Electron";
                 else if (intDiv(4903, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4904, Math.pow (10, 4 - str.length)) >= numInStr ||
                             intDiv(4905, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4906, Math.pow (10, 4 - str.length)) >= numInStr ||
                             intDiv(4911, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4912, Math.pow (10, 4 - str.length)) >= numInStr ||
                             intDiv(4936, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(4937, Math.pow (10, 4 - str.length)) >= numInStr)
                         return "✔    Visa / Switch";
                  else
                         return "✔    Visa";
         }
         else if ((4026 * Math.pow (10, str.length - 4) <= numInStr) && (4027 * Math.pow (10, str.length - 4) > numInStr) ||
                     (4405 * Math.pow (10, str.length - 4) <= numInStr) && (4406 * Math.pow (10, str.length - 4) > numInStr) ||
                     (4508 * Math.pow (10, str.length - 4) <= numInStr) && (4509 * Math.pow (10, str.length - 4) > numInStr) ||
                     (4844 * Math.pow (10, str.length - 4) <= numInStr) && (4845 * Math.pow (10, str.length - 4) > numInStr) ||
                     (4913 * Math.pow (10, str.length - 4) <= numInStr) && (4914 * Math.pow (10, str.length - 4) > numInStr) ||
                     (4917 * Math.pow (10, str.length - 4) <= numInStr) && (4918 * Math.pow (10, str.length - 4) > numInStr))
                  return "✔    Visa Electron";
         else if ((4903 * Math.pow (10, str.length - 4) <= numInStr) && (4904 * Math.pow (10, str.length - 4) > numInStr) ||
                     (4905 * Math.pow (10, str.length - 4) <= numInStr) && (4906 * Math.pow (10, str.length - 4) > numInStr) ||
                     (4911 * Math.pow (10, str.length - 4) <= numInStr) && (4912 * Math.pow (10, str.length - 4) > numInStr) ||
                     (4936 * Math.pow (10, str.length - 4) <= numInStr) && (4937 * Math.pow (10, str.length - 4) > numInStr))
                  return "✔    Switch";
         else if (str.length < 6 && (intDiv (417500, Math.pow (10, 6 - str.length)) <= numInStr) && (intDiv (417501, Math.pow (10, 6 - str.length)) >= numInStr)) 
                  return "✔    Visa / Visa Electron";
         else if (str.length >= 6 && (417500 * Math.pow (10, str.length - 6) <= numInStr) && (417501 * Math.pow (10, str.length - 6) > numInStr))
                  return "✔    Visa Electron";
         else
                  return "✔    Visa";
     }
     else if (str[0] == '5')
     {
          if (str.length == 1)
                 return "✔    MasterCard / Maestro / Diners Club (US & Can) / Dankort / Switch / Bankcard";
          else if (str[1] == '0')
          {
                 if (str.length <= 4 && intDiv (5019, Math.pow (10, 4 - str.length)) == numInStr || 
                      str.length > 4 && 5019 * Math.pow (10, str.length - 4) <= numInStr && 5020 * Math.pow (10, str.length - 4) > numInStr)
                       return "✔    Maestro / Dankort";
                 else
                       return "✔    Maestro";
          }
          else if (parseInt(str[1]) >= 1 && parseInt(str[1]) <= 3)
                 return "✔    MasterCard";
          else if (str[1] == '4' || str[1] == '5')
                 return "✔    MasterCard / Diners Club (US & Can)";
          else if (parseInt(str[1]) >= 6 && parseInt(str[1]) <= 8)
          {
                 if (str[1] == '6')
                 {
                          if (str.length == 2)
                                return "✔    Maestro / Switch / Bankcard";
                          else if (str.length < 4 && intDiv(5610, Math.pow (10, 4 - str.length)) <= numInStr && intDiv(5611, Math.pow (10, 4 - str.length)) >= numInStr ||
                                      str.length >= 4 && 5610 * Math.pow (10, str.length - 4) <= numInStr && 5611 * Math.pow (10, str.length - 4) > numInStr)
                                return "✔    Maestro / Bankcard";
                          else if (str.length < 6 && intDiv(564182, Math.pow (10, 6 - str.length)) <= numInStr && intDiv(564183, Math.pow (10, 6 - str.length)) >= numInStr ||
                                      str.length >= 6 && 564182 * Math.pow (10, str.length - 6) <= numInStr && 564183 * Math.pow (10, str.length - 6) > numInStr)
                                return "✔    Maestro / Switch";
                          else if (str.length < 6 && (intDiv (560221,Math.pow (10, 6 - str.length)) <= numInStr) 
                                                           && (intDiv (560225,Math.pow (10, 6 - str.length)) >= numInStr) || 
                                     str.length >= 6 && (560221 * Math.pow (10, str.length - 6) <= numInStr) && (560226 * Math.pow (10, str.length - 6) > numInStr))
                                return "✔    Maestro / Bankcard";
                          else
                               return "✔    Maestro";
                 }
                 else
                      return "✔    Maestro";
          }
          else
                 return "✖    No Company!";
     }
     else if (str[0] == '6')
     {        
           if (str.length == 1)
                 return "✔    China UnionPay / Maestro / Discover / InterPayment / InstaPayment / Solo / Switch / Laser";
           else if ((str.length <= 4 && intDiv (6011, Math.pow (10, 4 - str.length)) == numInStr))
                 return "✔    Maestro / Discover";
           else if (str.length > 4 && (6011 * Math.pow (10, str.length - 4) <= numInStr) && (6012 * Math.pow (10, str.length - 4) > numInStr))
                 return "✔    Discover";
           else if (str[1] == '2')
           {
                  if (str.length <= 6 && (intDiv (622126, Math.pow (10, 6 - str.length)) <= numInStr) && (intDiv (622925, Math.pow (10, 6 - str.length)) >= numInStr) ||
                       str.length > 6 && (622126 * Math.pow (10, str.length - 6) <= numInStr) && (622926 * Math.pow (10, str.length - 6) > numInStr))
                          return "✔    China UnionPay / Maestro / Discover";
                  else
                          return "✔    China UnionPay / Maestro";
           }
           else if (str[1] == '3')
           {
               if (str.length == 2)
                     return "✔    Maestro / InterPayment / InstaPayment / Solo / Switch / Laser";
               else if (str[2] == '0')
               {
                     if (str.length == 3)
                           return "✔    Maestro / Laser";
                     else if (str[3] == '4')
                           return "✔    Maestro / Laser";
                     else
                           return "✔    Maestro";
               }
               else if (str[2] == '3')
               {
                      if (str.length == 3)
                            return "✔    Maestro / Solo / Switch";
                      else if (str[3] == '3')
                            return "✔    Maestro / Switch";
                      else if (str[3] == '4')
                            return "✔    Maestro / Solo";
                      else if (str.length < 6 && intDiv(633110, Math.pow (10, 6 - str.length)) <= numInStr && intDiv(633111, Math.pow (10, 6 - str.length)) >= numInStr ||
                                  str.length >= 6 && 633110 * Math.pow (10, str.length - 6) <= numInStr && 633111 * Math.pow (10, str.length - 6) > numInStr)
                            return "✔    Maestro / Switch";
                      else
                            return "✔    Maestro";
               }
               else if (str[2] == '6')
                     return "✔    Maestro / InterPayment";
               else if (str[2] == '7' || str[2] == '8' || str[2] == '9')
                     return "✔    Maestro / InstaPayment";
               else
                     return "✔    Maestro";
           }
           else if (str.length <= 3 && intDiv (644, Math.pow (10, 3 - str.length)) <= numInStr && intDiv (649, Math.pow (10, 3 - str.length)) >= numInStr ||
                       str.length > 3 && (644 * Math.pow (10, str.length - 3) <= numInStr) && (649 * Math.pow (10, str.length - 3) >= numInStr) || str[1] == '5')
                 return "✔    Maestro / Discover";
           else if (str[1] == '7')
           {
                if (str.length == 2)
                     return "✔    Maestro / Solo / Switch / Laser";
                else if (str[2] == '0')
                {
                     if (str.length == 3)
                         return "✔    Maestro / Laser";
                     else if (str[3] == '6' || str[3] == '9')
                         return "✔    Maestro / Laser";
                     else
                         return "✔    Maestro";
                }
                else if (str[2] == '5')
                {
                     if (str.length == 3)
                         return "✔    Maestro / Switch";
                     else if (str[3] == '9')
                         return "✔    Maestro / Switch";
                     else
                         return "✔    Maestro";
                }
                else if (str[2] == '6')
                {
                     if (str.length == 3)
                         return "✔    Maestro / Solo";
                     else if (str[3] == '7')
                         return "✔    Maestro / Solo";
                     else
                         return "✔    Maestro";
                }
                else if (str[2] == '7')
                {
                     if (str.length == 3)
                         return "✔    Maestro / Laser";
                     else if (str[3] == '1')
                         return "✔    Maestro / Laser";
                     else
                         return "✔    Maestro";
                }
                else
                     return "✔    Maestro";
           }
           else
                 return "✔    Maestro";
     }
     else // All the numbers that begin with 7, 8 or 9
          return "✖    No Company!";
}

// 'verify' checks for 3 things in the string 'str': (1) its checks if the number belong to any credit card company. If so,
//	(2) it finds the number of digits and the masking pattern of the credit card number. If the number of digits
//	is sufficient, (3) it executes Luhn's algorithm on the number to check if it is a valid credit card number.
//	At all stages, corresponding messages are printed to the user regarding the findings of this function.
function verify(str)
{
      str = str.replace(/[\D\s]/g, ''); // Regex to clean all spaces and non-digits from the string.
      var temp = companyName(str);
      if (temp.length > 1 && temp[0] == '✔')
             document.getElementsByClassName("company")[0].style.color = "green";
      else
             document.getElementsByClassName("company")[0].style.color = "red";
      document.getElementsByClassName("company")[0].innerHTML = temp;
      numberOfDigits (str);
      if (document.getElementsByClassName("digits")[0].innerHTML.length > 0 && document.getElementsByClassName("digits")[0].innerHTML[0] == '✔')
             document.getElementsByClassName("digits")[0].style.color = "green";
      else
             document.getElementsByClassName("digits")[0].style.color = "red";
      // As long as the number matches some company, and there are sufficient digits to match a card, apply the Luhn Algorithm:
      if ( document.getElementsByClassName("digits")[0].innerHTML.length > 0 && document.getElementsByClassName("digits")[0].innerHTML[0] == '✔')
      {
            if (luhnAlgoSum(str) % 10 == 0) // If the sum of the digits (as explained in the Luhn Algorithm) divides 10, then
            {
                 document.getElementsByClassName("passedLuhn")[0].style.color = "green"; // Color the message green, and
                 document.getElementsByClassName("passedLuhn")[0].innerHTML = "✔    Passed the Luhn Algorithm - Verified!"; // State that the card is verified.
            }
            else // Otherwise,
            {
                 document.getElementsByClassName("passedLuhn")[0].style.color = "red"; // Color the message red, and
                 document.getElementsByClassName("passedLuhn")[0].innerHTML = "✖    Did not Pass the Luhn Algorithm - Unverified"; // State it is unverified.
            }
      }
      else // If the number of digits is less than or greater than those that could represent a valid card for the corresponding company,
             document.getElementsByClassName("passedLuhn")[0].innerHTML = ""; // don't execute Luhn's Algo and keep the message empty.
}

function numberOfDigits (str)
{
    var digits = document.getElementsByClassName("digits")[0],
          number = document.getElementsByClassName("number")[0];

    if (document.getElementsByClassName("company")[0].innerHTML == "✖    No Company!" ||
         document.getElementsByClassName("company")[0].innerHTML == "")
    {
        digits.innerHTML = ""; // Empty the message about the number of needed digits.
        number.maxLength = 19; // Set some nonzero length.
    }
    else if (str[0] == '1')
    {
         number.maxLength = 17; // 15 + (2 spaces)
         if (str.length != 15)
               digits.innerHTML = "✖    Must have 15 digits!";
         else
               digits.innerHTML = "✔    Exactly 15 digits";
         number.value = str.replace(/^([0-9]{4}) *([0-9]{1,5}) *([0-9]*)$/, "$1 $2 $3"); // Mask the Number w/ spaces
         number.value = number.value.trim(); // Remove the space at the end.
    }
    else if (document.getElementsByClassName("company")[0].innerHTML 
                  == "✔    American Express / Diners Club (Carte Blanche) / Diners Club (Int’l) / JCB")
    {
            number.maxLength = 16;
            digits.innerHTML = "✖    Must have 14, 15 or 16 digits!";
    }
    else if (document.getElementsByClassName("company")[0].innerHTML == "✔    Diners Club (Carte Blanche) / Diners Club (Int’l)" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Diners Club (Int’l)")
    {
        number.maxLength = 16; // 14 + (2 spaces)
        if (str.length == 14)
                 digits.innerHTML = "✔    Exactly 14 digits";
        else
                 digits.innerHTML = "✖    Must have 14 digits!";
        number.value = str.replace(/^([0-9]{4}) *([0-9]{1,6}) *([0-9]{0,4})$/, "$1 $2 $3"); // Mask the Number w/ spaces
        number.value = number.value.trim(); // Remove the space at the end.
    }
    else if (document.getElementsByClassName("company")[0].innerHTML == "✔    American Express")
    {
        number.maxLength = 17; // 15 + (2 spaces)
        if (str.length == 15)
                 digits.innerHTML = "✔    Exactly 15 digits";
        else
                 digits.innerHTML = "✖    Must have 15 digits!";
        number.value = str.replace(/^([0-9]{4}) *([0-9]{1,6}) *([0-9]{0,5})$/, "$1 $2 $3"); // Mask the Number w/ spaces
        number.value = number.value.trim(); // Remove the space at the end.
    }
    else if (document.getElementsByClassName("company")[0].innerHTML == "✔    Diners Club enRoute")
    {
        number.maxLength = 17; // 15 + (2 spaces)
        if (str.length == 15)
                 digits.innerHTML = "✔    Exactly 15 digits";
        else
                 digits.innerHTML = "✖    Must have 15 digits!";
        number.value = str.replace(/^([0-9]{4}) *([0-9]{1,7}) *([0-9]{0,4})$/, "$1 $2 $3"); // Mask the Number w/ spaces
        number.value = number.value.trim(); // Remove the space at the end.
    }
    else if (document.getElementsByClassName("company")[0].innerHTML == "✔    Visa Electron" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    MasterCard" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    MasterCard / Diners Club (US &amp; Can)" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Switch")
    {
        number.maxLength = 19; // 16 + (3 spaces)
        if (str.length == 16)
                 digits.innerHTML = "✔    Exactly 16 digits";
        else
                 digits.innerHTML = "✖    Must have 16 digits!";
        number.value = str.replace(/([0-9]{4}) */g, "$1 "); // Mask the Number w/ spaces
        number.value = number.value.trim(); // Remove the space at the end.
    }
    else if (document.getElementsByClassName("company")[0].innerHTML == "✔    JCB" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Visa / Visa Electron / Switch" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Visa / Switch" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Visa / Visa Electron" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Visa" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Discover")
    {
         number.maxLength = 23; // 19 + (at max 4 spaces)
         if (str.length == 16)
         {
               number.value = str.replace(/([0-9]{4}) */g, "$1 "); // Mask the Number w/ spaces
               number.value = number.value.trim(); // Remove the space at the end.
               digits.innerHTML = "✔    Exactly 16 digits";
         }
         else if (str.length == 19)
         {
               number.value = str.replace(/([0-9]{4}) */g, "$1 "); // Mask the Number w/ spaces
               number.value = number.value.trim(); // Remove the space at the end.
               digits.innerHTML = "✔    Exactly 19 digits";
         }
         else
         {
               number.value = str.replace(/([0-9]{4}) */g, "$1 "); // Mask the Number w/ spaces
               number.value = number.value.trim(); // Remove the space at the end.
               digits.innerHTML = "✖    Must have 16 or 19 digits!";
         }
    }
    else if (document.getElementsByClassName("company")[0].innerHTML == "✔    MasterCard / Maestro / Diners Club (US &amp; Can) / Dankort" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / Dankort" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    China UnionPay / Maestro / Discover / InterPayment / InstaPayment / Solo / Switch / Laser" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / Discover" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    China UnionPay / Maestro / Discover" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    China UnionPay / Maestro" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / InterPayment / InstaPayment / Solo / Switch / Laser" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / Laser" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / Solo / Switch" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / Solo" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / Solo / Switch / Laser" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / InterPayment" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / InstaPayment" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / Switch / Bankcard" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / Bankcard" ||
                document.getElementsByClassName("company")[0].innerHTML == "✔    Maestro / Switch")
    {
         number.maxLength = 23; // 19 + (at max 4 spaces)
         if (str.length == 13)
         {
               number.value = str.replace(/([0-9]{4}) *([0-9]{1,4}) *([0-9]*)/, "$1 $2 $3"); // Mask the Number w/ spaces
               number.value = number.value.trim(); // Remove the space at the end.
               digits.innerHTML = "✔    Exactly 13 digits";
               document.getElementsByClassName("company")[0].innerHTML = "✔    Maestro"; // Because this pattern matches only Maestro.
         }
         else if (str.length == 15)
         {
               number.value = str.replace(/([0-9]{4}) *([0-9]{1,6}) *([0-9]*)/, "$1 $2 $3"); // Mask the Number w/ spaces
               number.value = number.value.trim(); // Remove the space at the end.
               digits.innerHTML = "✔    Exactly 15 digits";
               document.getElementsByClassName("company")[0].innerHTML = "✔    Maestro"; // Because this pattern, too, matches only Maestro.
         }
         else if (str.length == 16)
         {
               number.value = str.replace(/([0-9]{4}) */g, "$1 "); // Mask the Number w/ spaces
               number.value = number.value.trim(); // Remove the space at the end.
               digits.innerHTML = "✔    Exactly 16 digits";
         }
         else if (str.length == 19)
         {
               number.value = str.replace(/([0-9]{4}) */g, "$1 "); // Mask the Number w/ spaces
               number.value = number.value.trim(); // Remove the space at the end.
               digits.innerHTML = "✔    Exactly 19 digits";
               // If there are 19 digits, remove the names of companies that have no 19-digit-pattern from the list of companies:
               if (document.getElementsByClassName("company")[0].innerHTML != "✔    China UnionPay / Maestro" &&
                    document.getElementsByClassName("company")[0].innerHTML != "✔    Maestro / Solo")
                 document.getElementsByClassName("company")[0].innerHTML = "✔    Maestro"; // Because this pattern, too, matches only Maestro.
         }
         else // If str.length is 1-12, 14, 17 or 18, space as below:
         {
               number.value = str.replace(/([0-9]{4}) */g, "$1 "); // Mask the Number w/ spaces
               number.value = number.value.trim(); // Remove the space at the end.
               digits.innerHTML = "✖    Must have 13, 15, 16 or 19 digits!";
         }
    }
    // No 'else' - all cases are covered above!
}

// A recursive (and, hence, functional) function returning the sum 
//	to be checked for mod 10 as part of the Luhn Algorithm.
// Notice that we have decided to sum the rightmost digit in the beginning
//	(rather at the end) of the procedure since summation is a 
//	commutative operation, and it does not matter whether you
//	add a digit at the beginning of a large addition operation or
//	at its end. The result of summing the digit now is not different
//	than if we summed it at the end to find the remainder of the
//	division by 10.
function luhnAlgoSum (str)
{
      var doubling = 0, // Integer to hold every other digit to-be-doubled.
            sum = 0; // Integer to the sum of digits.
      if (str.length != 0) // As long as there are digits to sum,
      {
           sum += parseInt(str[str.length - 1]); // Put the last digit of the string into 'sum'.
           str = str.substring(0, str.length-1); // Remove the last character from the string.
           if (str.length != 0) // As long as there are digits to sum,
           {
               doubling = 2 * parseInt(str[str.length - 1]); // Put the double of the *current* last digit of the string into 'doubling'.
               if (doubling >= 10) // If it is a two digit number,
                     sum += intDiv (doubling, 10) + doubling % 10; // Put the sum of the digits of doubled into 'sum'.
               else // Otherwise,
                     sum += doubling; // Just put the double of that digit into 'sum'
               str = str.substring(0, str.length-1); // Remove this last character from the string.
               sum += luhnAlgoSum (str); // Recursively call 'luhnAlgoSum' to continue until 'str' is empty.
           }
       }
       return sum; // Return the sum of the digits
}

// The function 'displayYear()' assigns today's 4-digit year into the 'span' that has the class 'year'.
function displayYear()
{
     document.getElementsByClassName("year")[0].innerHTML = (new Date()).getFullYear();
}