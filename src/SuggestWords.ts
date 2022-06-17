/**
 * Class containing info on the match criteria for the suggested words
 */
export class MatchCriteria {
    /**
     * Array of the correct letters in the correct positions
     */
    correctLetters: Array<string>;

    /**
     * String of letters contained in the match word at some position
     */
    containLetters: string;

    /**
     * String of letters not contained anywhere in the match word 
     */
    notContainLetters: string;

    constructor() {
        this.correctLetters = ['', '', '', '', '']
        this.containLetters = '';
        this.notContainLetters = '';
    }

    /**
     * Return true if one or more fields has been set
     * @returns Return true if one or more fields has been set
     */
    hasData() : boolean {
        return this.correctLetters[0].trim() != '' || 
        this.correctLetters[1].trim() != '' || 
        this.correctLetters[2].trim() != '' || 
        this.correctLetters[3].trim() != '' || 
        this.correctLetters[4].trim() != '' || 
        this.containLetters.trim() != '' || 
        this.notContainLetters.trim() != '' ;
    }

}

/**
 * Get a list of words based on the word data (i.e. correctly placed letters, containing letters or not containing letters)
 * @param wordData search data on the matching word
 * @param dictionary dictionary of possible words
 * @returns array of matching words from the dictionary
 */
function SuggestWords(wordData: MatchCriteria, dictionary: string[]) {
    if (!dictionary) {
        return [];
    }

    if (!wordData) {
        return dictionary;
    }

    if (wordData.correctLetters.length != 5) {
        throw new TypeError("exected 5 correctLetters entries, got " + wordData.correctLetters.length);
    }

    return dictionary.filter(entry => isMatchingWord(wordData, entry));

    
}

/**
 * Return true if the wortd matches the criteria
 * @param wordData search data on the matching word
 * @param word word to match on
 * @returns true if the word matches the matchCriteria, otherwise false
 */
function isMatchingWord(wordData: MatchCriteria, word: string) {
    let isMatch: boolean = true;

    if (wordData != null && word != null) {
        let letters: string[] = word.toLowerCase().split("");

        // check criteria has been entered
        if (!wordData.hasData()) {
            // no match criteria specified
            return false;
        }
        
        // first check the exact match letters
        for (let index in letters) {
            if (wordData.correctLetters[index].trim() != '' && wordData.correctLetters[index] != letters[index]) {
                isMatch = false;
                break;
            }
        }

        // next check the contains letters
        if (isMatch && wordData.containLetters.length > 0) {
            for (let containsletter of wordData.containLetters) {
                if (!word.includes(containsletter)) {
                    isMatch = false;
                    break;
                }
            }
        }

        // finally checks the not contains letters
        if (isMatch && wordData.notContainLetters.length > 0) {
            for (let letter of letters) {
                if (wordData.notContainLetters.includes(letter)) {
                    isMatch = false;
                    break;
                }
            }
        }
    }

    return isMatch;
}

export default SuggestWords;