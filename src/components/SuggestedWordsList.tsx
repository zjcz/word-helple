import './SuggestedWordsList.css';

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
      <div className="wordListContainer">
        <ul>{wordList}</ul>
      </div>
      <div>{wordList.length} matches found</div>
    </div>
  );
}

export default SuggestedWordsList;