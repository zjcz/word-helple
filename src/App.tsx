import React, { useState, useEffect }  from 'react';
import internal from 'stream';
import './App.css';
import WordSearchForm from './components/WordSearchForm';
import SuggestedWordsList from './components/SuggestedWordsList';
import SuggestWords, { MatchCriteria } from './SuggestWords';

function App() {
  const [wordData, setWordData] = useState(new MatchCriteria());
  const [suggestedWords, setSuggestedWords] = useState(['']); 
  const [dictionary, setDictionary] = useState(['']);

  const matchCriteriaChanged = (newMatchData: MatchCriteria) => {
    setWordData(newMatchData);
  };

  useEffect(() => {
   // load the word list
   const myMarkdownFile = require("./wordlist.txt");
   fetch(myMarkdownFile)
    .then((res: Response) => res.text())
    .then((data: String) => {console.log(data); setDictionary(data.split('\n'))});
  }, []);

  useEffect(() => {
    setSuggestedWords(SuggestWords(wordData, dictionary));
  }, [wordData]);

  return (
    <div>
    <WordSearchForm wordData={wordData} suggestWordsCallback={matchCriteriaChanged} />
    <SuggestedWordsList suggestedWords={suggestedWords} />
    </div>
  );
}

export default App;
