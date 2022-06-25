# Word Helple 
This is a small web app used to help find matching words when playing [Wordle](https://www.nytimes.com/games/wordle/index.html), or any other "guess the 5 letter word" game.
The purpose of this project was for me to practice using [React.js](https://reactjs.org/) and is the first time I've used the library. The project was created using [Create React App](https://github.com/facebook/create-react-app).

## Overview
The basic design of the app follows other similar wordle helper web sites, allowing the user to enter the the correctly placed letters, the correct letters in the wrong place, and the incorrect letters. The app will then suggest possible matches the user could try for their next guess.

The app uses 2 React components to generate the screen.  The first is the search criteria component, which allows the user to enter the correct and incorrect letters and the second component displays the list of matching words.

A preview of the site can be found [here](https://salmon-forest-07b9fb103.1.azurestaticapps.net/).  It is hosted on Azure using a GitHub action to push the latest version of the site when a commit is made to the repository.

## Wordlist
The list of possible words is taken from https://raw.githubusercontent.com/tabatkins/wordle-list/main/words.  I also came across a list at https://static.nytimes.com/newsgraphics/2022/01/25/wordle-solver/assets/solutions.txt which is much shorter and I felt it was better to go with the longer list.

## Matching
The app uses regex to find matching words based on the criteria entered.  It builds the regex string by applying the following:

* For each wrongly placed correct letter, it adds the string "(?=[a-z]*[x])", where "x" is substituted for one of the wrongly placed correct letters.
* For the incorrect letter, it adds the string "(?![a-z]*[xyz])" where "xyz" is substituted for the incorrect letters
* Finally, for the correctly placed letters, it appends these to the end. If a letter has not been placed in a position yet it appends "."

### Example 1  
>* Correctly placed: ab---
>* Incorrectly placed: v
>* Incorrect letters: dz
>* Regex: ^(?=[a-z]*[v])(?![a-z]*[dz])ab...$

### Example 2
>* Correctly placed: --o--
>* Incorrectly placed: ab
>* Incorrect letters: d
>* Regex: ^(?=[a-z]*[a])(?=[a-z]*[b])(?![a-z]*[d])..o..$

### Example 3
>* Correctly placed: -----
>* Incorrectly placed: 
>* Incorrect letters: xyz
>* Regex: ^(?![a-z]*[xyz]).....$
