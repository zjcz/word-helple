import SuggestWords, { MatchCriteria } from './SuggestWords';

test('no errors on no match data', () => {
    
    let x: MatchCriteria = new MatchCriteria();

    let match = SuggestWords(x, ['cable', 'carry', 'abcde']);  
    expect(match.length).toEqual(0);  
});

///////////////////////////////////////
// tests for correctLetters
///////////////////////////////////////

test('match correct letters', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.correctLetter0 = 'c';
    x.correctLetter1 = 'a';
    x.correctLetter2 = 'b';
    x.correctLetter3 = 'l';
    x.correctLetter4 = 'e';

    let match = SuggestWords(x, ['cable']);  
    expect(match.length).toEqual(1);
    expect(match[0]).toEqual('cable');
});

test('match correct letters - no match for wrong order', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.correctLetter0 = 'e';
    x.correctLetter1 = 'l';
    x.correctLetter2 = 'b';
    x.correctLetter3 = 'a';
    x.correctLetter4 = 'c';

    let match = SuggestWords(x, ['cable']);  
    expect(match.length).toEqual(0);    
});

test('match correct letters - partial match on multiple words', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.correctLetter0 = 'c';
    x.correctLetter1 = 'a';

    let match = SuggestWords(x, ['cable', 'carry', 'horse']);  
    expect(match.length).toEqual(2);  
    expect(match[0]).toEqual('cable');
    expect(match[1]).toEqual('carry');  
});

test('match correct letters - partial match on multiple words - not starting at 0', () => {
    
    let x: MatchCriteria = new MatchCriteria();    
    x.correctLetter1 = 'a';

    let match = SuggestWords(x, ['cable', 'carry', 'horse']);  
    expect(match.length).toEqual(2);  
    expect(match[0]).toEqual('cable');
    expect(match[1]).toEqual('carry');  
});

///////////////////////////////////////
// tests for containsLetters
///////////////////////////////////////

test('match containing letters', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.containLetters = 'elbac';

    let match = SuggestWords(x, ['cable']);  
    expect(match.length).toEqual(1);
    expect(match[0]).toEqual('cable');
});

test('match containing letters - partial match', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.containLetters = 'ca';

    let match = SuggestWords(x, ['cable']);  
    expect(match.length).toEqual(1);
    expect(match[0]).toEqual('cable');
});

test('match containing letters - no match for wrong letters', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.containLetters = 'cvwxyz';

    let match = SuggestWords(x, ['cable']);  
    expect(match.length).toEqual(0);    
});

test('match containing letters - partial match on multiple words', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.containLetters = 'ca';

    let match = SuggestWords(x, ['cable', 'carry', 'horse']);  
    expect(match.length).toEqual(2);  
    expect(match[0]).toEqual('cable');
    expect(match[1]).toEqual('carry');  
});

test('match containing letters - partial match on multiple words in random order', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.containLetters = 'ac';

    let match = SuggestWords(x, ['cable', 'carry', 'horse']);  
    expect(match.length).toEqual(2);  
    expect(match[0]).toEqual('cable');
    expect(match[1]).toEqual('carry');  
});

///////////////////////////////////////
// tests for notContainLetters
///////////////////////////////////////

test('ignore words without not containing letters', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.notContainLetters = 'h';

    let match = SuggestWords(x, ['cable', 'horse']);  
    expect(match.length).toEqual(1);
    expect(match[0]).toEqual('cable');
});

test('ignore words without not containing letters - multiple lettersr', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.notContainLetters = 'hxyz';

    let match = SuggestWords(x, ['cable', 'horse']);  
    expect(match.length).toEqual(1);
    expect(match[0]).toEqual('cable'); 
});

///////////////////////////////////////
// tests for combination
///////////////////////////////////////

test('correct, contains and not contains same letter', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.correctLetter0 = 'c'
    x.containLetters = 'c'
    x.notContainLetters = 'c';

    let match = SuggestWords(x, ['cable', 'horse']);  
    expect(match.length).toEqual(0);    
});

test('combination match on word', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.correctLetter0 = 'c'
    x.containLetters = 'c'
    x.notContainLetters = 'h';

    let match = SuggestWords(x, ['cable', 'horse']);  
    expect(match.length).toEqual(1);
    expect(match[0]).toEqual('cable'); 
});

test('combination match on word - upper case', () => {
    
    let x: MatchCriteria = new MatchCriteria();
    x.correctLetter0 = 'C'
    x.containLetters = 'C'
    x.notContainLetters = 'H';

    let match = SuggestWords(x, ['cable', 'horse']);  
    expect(match.length).toEqual(1);
    expect(match[0]).toEqual('cable'); 
});

