/**
 * Class containing info on the match criteria for the suggested words
 */
export class MatchCriteria {
    /**
     * Array of the correct letters in the correct positions
     */    
    correctLetter0: string;
    correctLetter1: string;
    correctLetter2: string;
    correctLetter3: string;
    correctLetter4: string;

    /**
     * String of letters contained in the match word at some position
     */
    containLetters: string;

    /**
     * String of letters not contained anywhere in the match word 
     */
    notContainLetters: string;

    constructor() {
        this.correctLetter0 = '';
        this.correctLetter1 = '';
        this.correctLetter2 = '';
        this.correctLetter3 = '';
        this.correctLetter4 = '';
        this.containLetters = '';
        this.notContainLetters = '';
    }

    /**
     * Return true if one or more fields has been set
     * @returns Return true if one or more fields has been set
     */
    hasData() : boolean {
        return this.correctLetter0.trim() !== '' || 
        this.correctLetter1.trim() !== '' || 
        this.correctLetter2.trim() !== '' || 
        this.correctLetter3.trim() !== '' || 
        this.correctLetter4.trim() !== '' || 
        this.containLetters.trim() !== '' || 
        this.notContainLetters.trim() !== '' ;
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

    const matchingCharRegex = convertToRegex(wordData);
    const regex = new RegExp(matchingCharRegex);
    return dictionary.filter(entry => (regex.test(entry)));    
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
        if (wordData.containLetters !== null && wordData.containLetters.trim() !== "") {
            for (const ch of wordData.containLetters.trim().toLowerCase()) {
                regEx += `(?=[a-z]*[${ch}])`;    
            }
        }
        if (wordData.notContainLetters !== null && wordData.notContainLetters.trim() !== "") {
            regEx += `(?![a-z]*[${wordData.notContainLetters.trim().toLowerCase()}])`;
        }

        // finally action the correct letters and add them to the regex
        // if no correct letter is included, use the . char for any character        
        regEx += (wordData.correctLetter0 !== null && wordData.correctLetter0.trim() !== "") ? wordData.correctLetter0.trim().toLowerCase() : ".";
        regEx += (wordData.correctLetter1 !== null && wordData.correctLetter1.trim() !== "") ? wordData.correctLetter1.trim().toLowerCase() : ".";
        regEx += (wordData.correctLetter2 !== null && wordData.correctLetter2.trim() !== "") ? wordData.correctLetter2.trim().toLowerCase() : ".";
        regEx += (wordData.correctLetter3 !== null && wordData.correctLetter3.trim() !== "") ? wordData.correctLetter3.trim().toLowerCase() : ".";
        regEx += (wordData.correctLetter4 !== null && wordData.correctLetter4.trim() !== "") ? wordData.correctLetter4.trim().toLowerCase() : ".";

        // finally add the end of string char
        regEx += "$";
    }

    return regEx;
}

export default SuggestWords;