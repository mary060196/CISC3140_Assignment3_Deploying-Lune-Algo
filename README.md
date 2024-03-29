﻿# Assignment 3: Automated Deployment!

This README.md file is going to be pushed into the GitHub repository 
```
https://github.com/mary060196/wow.git
```
as an updated. The update is to be named "Update of README File: Assignment 3". If this update succeeds, the 
```
Google Cloud Build History
``` 
will show a successful building operation and give its log details. Notice:
- A 
```
cloudbuild.yaml
``` 
is used within the project to make automated app deploy, so every time a push operation takes place, the deployment is updated.
- The success of this Assignment 3 is all due to the Quickstart tutorial provided by Google at
```
https://cloud.google.com/source-repositories/docs/quickstart-triggering-builds-with-source-repositories
```
- I followed this guide from the beginning to the end, except that I used a GitHub repository intead of a Google Cloud repository. In addition, I used the existing files from the project (besides changing the name of the `Python` file to `main.py` and deleting the import of the `webbrowser` library.) 
- The `app.yaml` file corresponds to the `Python 3.7` version with which the app was written, so it contains only a single line: `runtime: python37`.
- The `cloudbuild.yaml` file consists of
```
steps:
- name: 'gcr.io/cloud-builders/gcloud'
  args: ['app', 'deploy']
```
which is what allows integrated deployment at the time `Google Cloud` build the application as a consequence of a push.
- I would also upload screen-shots that depict the building processes. One image will show the list of most recent builds, and the other will show the details of each build.
- The website on which this application is being deployed is
```
https://luhn-algo.appspot.com
```
- A change has been made previously within the `luhn.html` file so that it shows the senstence: `Auto-Updated this with Git and App Engine!` on the webpage. This change also has building record in the building history.

# Luhn Algorithm Assignment (UI Version) 

This is the 2nd assignment in the Brooklyn College Summer 2019 CISC 3140 class. The students have been given two options: either to write a functioning luhn algorithm in the Scheme language, or to do the same but in JavaScript, and besides that also include HTML, CSS and a Python server to make it user-friendly and good looking. I have chosen the second option.

## Notes (Taken from some of the JavaScript comments)
- The function 'companyName' finds the name of the company based on the first digits of the number
(if there is such company, and if string of digits is not empty).
- There is an alternative ability to implement this function with regular expressions instead of conditionals, but the latter were used here for readability and convenience (a single regular expression that checks and filters all these criteria will probably occupy 1/2 page, which is quite hard to read, while the following 'if-else-if' function shows how different options are processed, character by character, until they fall under a particular condition.
- Notice that several credit card patterns (such as 62, 54-55, 5019) match the pattern of more than one company, so (since no more information besides what is on the website https://baymard.com/checkout-usability/credit-card-patterns is given) the returned string will contain the names of all these matching companies.
- However, if the number begins with 6011, it will be recognized as discover (despite the conflict with Maestro that has 600000‑699999 as beginning characters.) Also, the numbers 4026, 417500, 4405, 4508, 4844, 4913, 4917 of Visa Electron and 4903, 4905, 4911, 4936 of Switch will be recognized as such, respectively, despite the conflict with the Visa beginning digit 4. All other conflicts will result in the display of all their names within the message area in the browser, each separated by the forward slash '/'. 
- In the specific case of the digits 62, there is a conflict in the masking pattern of the 19-digit-long number (either (6-13) or (4-4-4-4-3)), so due to lack of knowledge, the pattern (4-4-4-4-3) was chosen.
- The website https://baymard.com/checkout-usability/credit-card-patterns also gives a list for patterns for perhaps retired card numbers. All these patterns were incorporated into the program as well, for convenience. Please, try these patterns out! If there is a numerical conflict, all companies will be displays (such as Maestro and Switch if the number of the card begins with 6333), unless the specific length of the number will only belong to one of the companies (such as 19-digit number that begins with 6333; according to all criteria, it can belong only to Maestro, since Switch has no 19 -digit pattern.
- Some other websites (such as https://www.freeformatter.com/credit-card-number-generator-validator.html) give fake examples of Visa, Discover and JCB cards of 19-digits-long, which are not encountered by other websites (the usual number of digits for the cards of these companies is exactly 16). Hence, this program will allow patterns for both 16 and 19 digits for these companies. 
- Finally, a word about some of the code lines below. The code 
```js
 intDiv (222100, Math.pow (10, 6 - str.length)) == numInStr
 ```
means "check if the number 'numInStr' is one of 2, 22, 222, 2221, 22210 or 222100". If we change the equality sign to some inequality sign, we will be checking if 'numInStr' is greater or smaller than the number that results by chopping off the digits of 222100 from the right (integer division), such that this resulting number has the same number of digits as 'numInStr'. We use this technique to check if a card number begins (or seems to begin) as a number of a specific company. Sometimes instead, we check for particular digits at some locations (str[0] --> the most dominant digit, str[1] --> the second most dominant digit, etc.)

## Note about the Recursive Juhn Algorithm Function
- I have decided to sum the rightmost digit in the beginning (rather at the end) of the procedure since summation is a commutative operation, and it does not matter whether you add a digit at the beginning of a large addition operation or at its end. The result of summing the digit now is not different than if we summed it at the end to find the remainder of the division by 10.

## Notes from the CSS file
- The 'calc()' unit value used below does not contain division or multiplication operations (and so it is supported by the Android 4.4 Browser, which has issues with / and *), and it is not used to compute 'background-position' (so it is supported by IE9). 'calc()' is not supported
by Opera Mini.
- There is no 'min-height' attribute within the '.messages' selector, so IE10 and IE11 work properly with the 'flex-direction' attribute. It is supported by Opera Mini.
- The 'transform' attribute 'is not supported by Opera Mini. All other browsers support it.
- The Stack Overflow answer in https://stackoverflow.com/a/24808755 tells that the purpose of Opera Mini is to reduce battery use, so it does not focus on graphics and styling, which is why many features, such as some of those above, are not supported by Opera Mini.

## Additional Notes
- The same notes from Assignment 1 are relevant here: please make sure all the files and the folders in this repo are downloaded to the same folder so that the program will be working and the styling will be applied.
- There is no need to type ```flask run``` after running the file with ```python luhn-back-end``` because the following lines in the python file will do so and open that page in the browser, for convenience:
```python
if __name__ == "__main__":
    webbrowser.open_new("http://localhost:8080/luhn/")
    app.run('localhost', 8080, True, use_reloader=False)
```

## Finally, a Word about the Decision to Use JavaScript rather than Scheme
Scheme, by nature, is a very logic-based and functional. This characteristic is mostly noticed by looking at this language's particular and very strict syntax. Moreover, Scheme is very limited in terms of styling the output, for the obtained output is given as plain text. This is very convenient for those interested in 'catching' as much data as possible on the screen (there is nothing distracting on the screen besides text), so individuals such as researchers or scholars might prefer using this language. Nevertheless, if the purpose of using the language is to create an application that a user (who is not a researcher or the like) will use, there are high chances that the 'look' of the output will no be enough attractive to the user. The user wants to see colors, shapes, nice fonts, etc., but the code for a relatively involved (and still unstyled) application in scheme will be long in terms of coding. On the other hand, writing a piece of code that does the same operation in JavaScript (1) will probably be shorter (2) will provide a way to display some good-looking result by using accompanying HTML and CSS coding, and (3) is possible to do in various ways by using the (almost) endless features of JavaScript. That is, for every purpose, there is more than one, and sometimes every more, ways to write code in JavaScript to execute the same operation. This is the reason many organizations have established conventions regarding the desired JavaScript coding used therein; they require that one particular programming feature will be used so that the reading, modification and debugging procedures on the code will be less difficult than if many features where used at once. Consider the example we spoke about in class about the way in which JavaScript accesses and element within HTML. The webpage [https://www.w3schools.com/js/js_htmldom_elements.asp](https://www.w3schools.com/js/js_htmldom_elements.asp)
Lists **5** different ways by which a programmer could access an element. Similarly, to define some styling options on HTML in CSS, a programmer could either use the class, or the id, or the tag. Some companies, as we mentioned, require to refer to elements in CSS only by the class name. All in all, having great variation within a language could be helpful in case a person forgot one of the options, but it can become cumbersome when the file written in the language has to undergo debugging. For this Assignment 2, because the program is relatively short (it is not a heavily operating website, for instance) which is why there is little change that debugging it will be difficult, and because user interface building is at stack, I have chosen the UI version.

**Thank you for Reading!** Miriam Briskman
