# Word Helple 

This is a small web app used to help find matching words when playing [Wordle](https://www.nytimes.com/games/wordle/index.html), or any other "guess the 5 letter word" game.

The purpose of this project was for me to practice using [React.js](https://reactjs.org/) and is the first time I've used the library. The project was created using [Create React App](https://github.com/facebook/create-react-app).

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&logoWidth=30 "React")
![Typescript](https://img.shields.io/badge/-Typescript-3178C6?logo=Typescript&logoColor=white&logoWidth=30 "Typescript")
![GitHub Pages](https://img.shields.io/badge/-GitHub%20Pages-181717?logo=github&logoColor=white&logoWidth=30 "GitHub Pages")
[![GH Pages Deploy](https://github.com/zjcz/word-helple/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/zjcz/word-helple/actions?query=workflow:"Deploy+to+GitHub+Pages")

## Overview
The basic design of the app follows other similar wordle helper web sites, allowing the user to enter the the correctly placed letters, the correct letters in the wrong place, and the incorrect letters. The app will then suggest possible matches the user could try for their next guess.

The app uses 2 React components to generate the screen.  The first is the search criteria component, which allows the user to enter the correct and incorrect letters and the second component displays the list of matching words.

A preview of the site can be found [here](https://zjcz.github.io/word-helple).  It is hosted on GitHub Pages using a GitHub action to deploy the latest version of the site when a push is made to the main repository.

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
