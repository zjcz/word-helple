import React, { useState }  from 'react';
import { MatchCriteria } from '../SuggestWords';

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
  const [values, setSearchValues] =  useState<MatchCriteria>(props.wordData);
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
      const searchValues: MatchCriteria = Object.create(values);
      if (name === "correctLetter0") {
        searchValues.correctLetter0 = lowerCaseValue;
      } else if (name === "correctLetter1") {
        searchValues.correctLetter1 = lowerCaseValue;
      } else if (name === "correctLetter2") {
        searchValues.correctLetter2 = lowerCaseValue;
      } else if (name === "correctLetter3") {
        searchValues.correctLetter3 = lowerCaseValue;
      } else if (name === "correctLetter4") {
        searchValues.correctLetter4 = lowerCaseValue;
      } else if (name === "containLetters") {
        searchValues.containLetters = lowerCaseValue;
      } else if (name === "notContainLetters") {
        searchValues.notContainLetters = lowerCaseValue;
      }
      setSearchValues(searchValues);
  };
  
  function getSuggestWords() {
    props.suggestWordsCallback(values);      
  };
  
  return (
    <form autoComplete='false' autoCapitalize='false'>
      <div>
        <p>Correctly Placed Letters</p>
        <input type="text" name="correctLetter0" maxLength={1} value={values.correctLetter0} onChange={handleInputChange} />
        <input type="text" name="correctLetter1" maxLength={1} value={values.correctLetter1} onChange={handleInputChange} />
        <input type="text" name="correctLetter2" maxLength={1} value={values.correctLetter2} onChange={handleInputChange} />
        <input type="text" name="correctLetter3" maxLength={1} value={values.correctLetter3} onChange={handleInputChange} />
        <input type="text" name="correctLetter4" maxLength={1} value={values.correctLetter4} onChange={handleInputChange} />
      </div>
      <div>
        <p>Right Letters, Wrong Place</p>
        <input type="text" name="containLetters" maxLength={26} value={values.containLetters} onChange={handleInputChange} />
      </div>
      <div>
        <p>Wrong Letters</p>
        <input type="text" name="notContainLetters" maxLength={26} value={values.notContainLetters} onChange={handleInputChange} />
      </div>      
        <button type="button" onClick={getSuggestWords}>Suggest Words</button>
      </form>  
  );
}

export default WordSearchForm;