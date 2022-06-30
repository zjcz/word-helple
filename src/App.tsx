import React, { useState, useEffect }  from 'react';
import './App.css';
import WordSearchForm from './components/WordSearchForm';
import SuggestedWordsList from './components/SuggestedWordsList';
import SuggestWords, { MatchCriteria } from './SuggestWords';

function App() {
  const [wordData, setWordData] = useState<MatchCriteria>(new MatchCriteria());
  const [suggestedWords, setSuggestedWords] = useState<Array<string>>([]); 
  const [dictionary, setDictionary] = useState<Array<string>>([]);

  const matchCriteriaChanged = (newMatchData: MatchCriteria) => {
    setWordData(newMatchData);
    setSuggestedWords(SuggestWords(newMatchData, dictionary));
  };

  useEffect(() => {
   // load the word list
   const myMarkdownFile = require("./wordlist.txt");
   fetch(myMarkdownFile)
    .then((res: Response) => res.text())
    .then((data: String) => {setDictionary(data.split('\n').sort())});
  }, []);

  return (
    <div>
      <h1>Word Helple</h1>
      <WordSearchForm wordData={wordData} suggestWordsCallback={matchCriteriaChanged} />
      <SuggestedWordsList suggestedWords={suggestedWords} />
    </div>
  );
}

export default App;
