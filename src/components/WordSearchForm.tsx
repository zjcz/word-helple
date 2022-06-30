import React, { useState }  from 'react';
import { MatchCriteria } from '../SuggestWords';
import './WordSearchForm.css';

/**
 * interface for props for the WordSearchForm component
 */
interface WordSearchFormProp {
  wordData: MatchCriteria;
  suggestWordsCallback: (newMatchData: MatchCriteria) => void;
}

/**
 * Render the word search form, allowing the user to 
 * enter the criteria to search for matching words
 * @param props props required for rendering
 * @returns JSX for the search form
 */
function WordSearchForm(props:WordSearchFormProp) {
  const [searchValues, setSearchValues] =  useState<MatchCriteria>(props.wordData);
  const matchingCharRegex = new RegExp('^[a-z]+$');

  /**
   * Handle the user input from one of the form elements
   * @param e event info
   */
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value } = (e.target as HTMLInputElement);  
      
      // check if the value is in the list of acceptable characters
      const lowerCaseValue = value.toLowerCase();      
      if (lowerCaseValue !== '' && !matchingCharRegex.test(lowerCaseValue)) {              
        return;        
      }

      // input is valid, add it to the search values and save to state
      const newSearchValues: MatchCriteria = Object.create(searchValues);
      if (name === "correctLetter0") {
        newSearchValues.correctLetter0 = lowerCaseValue;
      } else if (name === "correctLetter1") {
        newSearchValues.correctLetter1 = lowerCaseValue;
      } else if (name === "correctLetter2") {
        newSearchValues.correctLetter2 = lowerCaseValue;
      } else if (name === "correctLetter3") {
        newSearchValues.correctLetter3 = lowerCaseValue;
      } else if (name === "correctLetter4") {
        newSearchValues.correctLetter4 = lowerCaseValue;
      } else if (name === "containLetters") {
        newSearchValues.containLetters = lowerCaseValue;
      } else if (name === "notContainLetters") {
        newSearchValues.notContainLetters = lowerCaseValue;
      }
      setSearchValues(newSearchValues);
  };
  
  /**
   * list suggested words matching the criteria entered
   */
  function getSuggestWords() {
    props.suggestWordsCallback(searchValues);      
  };
    
  /**
   * reset the search criteria
   */
  function reset() {
    const newValues: MatchCriteria = new MatchCriteria();
    newValues.correctLetter0 = "";
    newValues.correctLetter1 = "";
    newValues.correctLetter2 = "";
    newValues.correctLetter3 = "";
    newValues.correctLetter4 = "";
    newValues.containLetters = "";
    newValues.notContainLetters = "";
    setSearchValues(newValues);  
    props.suggestWordsCallback(newValues);      
  };
  
  return (
    <form autoComplete='false' autoCapitalize='false'>
      <div>
        <label id="correctLetterLabel">Correctly Placed Letters</label>        
        <input type="text" name="correctLetter0" maxLength={1} value={searchValues.correctLetter0} onChange={handleInputChange} className="correctlyPlaced" aria-labelledby="correctLetterLabel" />
        <input type="text" name="correctLetter1" maxLength={1} value={searchValues.correctLetter1} onChange={handleInputChange} className="correctlyPlaced" aria-labelledby="correctLetterLabel" />
        <input type="text" name="correctLetter2" maxLength={1} value={searchValues.correctLetter2} onChange={handleInputChange} className="correctlyPlaced" aria-labelledby="correctLetterLabel" />
        <input type="text" name="correctLetter3" maxLength={1} value={searchValues.correctLetter3} onChange={handleInputChange} className="correctlyPlaced" aria-labelledby="correctLetterLabel" />
        <input type="text" name="correctLetter4" maxLength={1} value={searchValues.correctLetter4} onChange={handleInputChange} className="correctlyPlaced" aria-labelledby="correctLetterLabel" />
      </div>
      <div>
        <label id="containLettersLabel">Right Letters, Wrong Place</label>
        <input type="text" name="containLetters" maxLength={26} value={searchValues.containLetters} onChange={handleInputChange} className="containsLetters" aria-labelledby="containLettersLabel" />
      </div>
      <div>        
        <label id="notContainLettersLabel">Wrong Letters</label>
        <input type="text" name="notContainLetters" maxLength={26} value={searchValues.notContainLetters} onChange={handleInputChange} className="incorrectLetters" aria-labelledby="notContainLettersLabel" />
      </div>      
        <button type="button" onClick={getSuggestWords} className="suggestButton">Suggest Words</button>        
        <button type="button" onClick={reset} className="resetButton">Reset</button>
      </form>  
  );
}

export default WordSearchForm;