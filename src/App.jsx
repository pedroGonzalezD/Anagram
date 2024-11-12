import { useState, useEffect } from 'react'
import styles from './App.module.scss'

function App() {
  const [wordOne, setWordOne] = useState('')
  const [wordTwo, setWordTwo] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const isAnagram = (wordOne, wordTwo) =>{
    const lowerWordOne = wordOne.toLowerCase();
    const lowerWordTwo = wordTwo.toLowerCase();

    if ((lowerWordOne === lowerWordTwo) || (lowerWordOne.length !== lowerWordTwo.length)){
      return false
    }

    const sortedWordOne = lowerWordOne.split('').sort().join('')
    const sortedWordTwo = lowerWordTwo.split('').sort().join('')

    return sortedWordOne === sortedWordTwo
  }

    const handleSubmit = (e) =>{
      e.preventDefault();
      setError('')
      setResult(null)

      if(!wordOne || !wordTwo){
        setError("Please, enter both words.")
        return
      }

      const anagramResult = isAnagram(wordOne, wordTwo);
      setResult(anagramResult);
    }

    useEffect(() => {
      let timer;
  
      if (error || result !== null) {
        timer = setTimeout(() => {
          setError('');
          setResult(null);
        }, 3000);
      }
  
      return () => clearTimeout(timer);
    }, [error, result]);

  return (
    <>
      <div className={styles.container}>
        <h2>Anagram Checker</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
              <input 
                type="text" 
                value={wordOne}
                onChange = {(e) => setWordOne(e.target.value)}
                placeholder = "Enter the first word"
              />
              <input 
                type="text" 
                value={wordTwo}
                onChange = {(e) => setWordTwo(e.target.value)}
                placeholder = "Enter the second word"
              />
          </div>
          <button type="submit">Check</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {result !== null && (
          <p className={result ? styles.success : styles.error}>
            {result ? 'They are anagrams!' : 'They are not anagrams.'}
          </p>
        )}
      </div>
    </>
  )
}

export default App
