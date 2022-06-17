import React, { useState, useEffect }  from 'react';

interface SuggestedWordsProp {
  suggestedWords: string[];
}

function SuggestedWordsList(props: SuggestedWordsProp) {
  const wordList = props.suggestedWords.map((word) => 
    <li key={word}>
    {word}
    </li>
  );

  return (
    <div>
    <ul>{wordList}</ul>
    </div>
  );
}

export default SuggestedWordsList;