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

    if (!wordData || !wordData.hasData()) {
        return [];
    }

    if (wordData.correctLetters.length != 5) {
        throw new TypeError("exected 5 correctLetters entries, got " + wordData.correctLetters.length);
    }

    const regEx = convertToRegex(wordData);
    return dictionary.filter(entry => entry.match(regEx));

    
}

/**
 * Convert the word search criteria to a regular expression
 * @param wordData word search criteria to convert
 * @returns regex
 */
function convertToRegex(wordData: MatchCriteria) {
    let regEx:string = "";

    if (wordData != null && wordData.hasData()) {

        // first, add the contains and not contains letters
        regEx = "^";
        if (wordData.containLetters != null && wordData.containLetters.trim() != "") {
            for (const ch of wordData.containLetters.trim().toLowerCase()) {
                regEx += `(?=[a-z]*[${ch}])`;    
            }
        }
        if (wordData.notContainLetters != null && wordData.notContainLetters.trim() != "") {
            regEx += `(?![a-z]*[${wordData.notContainLetters.trim().toLowerCase()}])`;
        }

        // loop through the 5 possible correct letters and add them to the regex
        // if no correct letter is included, use the . char for any character
        for (let index in wordData.correctLetters) {
            if (wordData.correctLetters[index] != null && wordData.correctLetters[index].trim() != "") {
                regEx += wordData.correctLetters[index].trim().toLowerCase();
            } else {
                regEx += ".";
            }
        }

        // finally add the end of string char
        regEx += "$";
    }

    return regEx;
}

export default SuggestWords;