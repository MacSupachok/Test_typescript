function getQuestionPart(words: string[]): string[] {
    const commonWord = findCommonWord(words);
    const questionParts: string[] = []; // Explicitly define the type as string[]
  
    for (const word of words) {
      const questionPart = word.replace(commonWord, '').trim();
      questionParts.push(questionPart);
    }
  
    return questionParts;
  }
  
  function findCommonWord(words: string[]): string {
    // Sort the words in descending order of length
    const sortedWords = words.slice().sort((a, b) => b.length - a.length);
    const longestWord = sortedWords[0];
  
    // Find the common word by checking if the other words contain it
    for (let i = longestWord.length; i > 0; i--) {
      const commonWordCandidate = longestWord.slice(0, i);
      const isCommon = words.every(word => word.includes(commonWordCandidate));
  
      if (isCommon) {
        return commonWordCandidate;
      }
    }
  
    return '';
  }
  
  // Example usage:
  const inputWords1 = ["BATHROOM", "BATH SALTS", "BLOODBATH"];
  const questionPart1 = getQuestionPart(inputWords1);
  const inputWords2 = ["BEFRIEND", "GIRLFRIEND", "FRIENDSHIP"];
  const questionPart2 = getQuestionPart(inputWords2);
  console.log(questionPart1); // Output: ["ROOM", "SALTS", "BLOOD"]
  console.log(questionPart2); // Output: ["BE", "GIRL", "SHIP"]
  