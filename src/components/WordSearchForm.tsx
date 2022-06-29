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
  const defaultSearchValues = {
    correctLetter0: props.wordData.correctLetters[0],
    correctLetter1: props.wordData.correctLetters[1],
    correctLetter2: props.wordData.correctLetters[2],
    correctLetter3: props.wordData.correctLetters[3],
    correctLetter4: props.wordData.correctLetters[4],
    containsLetters: props.wordData.containLetters,
    incorrectLetters: props.wordData.notContainLetters,
  };

  const [values, setSearchValues] =  useState(defaultSearchValues);
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

      // input is valid, add it to the search values
      setSearchValues ({
          ...values,
          [name]: lowerCaseValue,
      });
  };
  
  function getSuggestWords() {
      let searchCriteria: MatchCriteria = new MatchCriteria();
      searchCriteria.correctLetters = [values.correctLetter0,
                                        values.correctLetter1,
                                        values.correctLetter2,
                                        values.correctLetter3,
                                        values.correctLetter4];
      searchCriteria.containLetters = values.containsLetters;
      searchCriteria.notContainLetters = values.incorrectLetters;

    props.suggestWordsCallback(searchCriteria);      
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
        <input type="text" name="containsLetters" maxLength={26} value={values.containsLetters} onChange={handleInputChange} />
      </div>
      <div>
        <p>Wrong Letters</p>
        <input type="text" name="incorrectLetters" maxLength={26} value={values.incorrectLetters} onChange={handleInputChange} />
      </div>      
        <button type="button" onClick={getSuggestWords}>Suggest Words</button>
      </form>  
  );
}

export default WordSearchForm;