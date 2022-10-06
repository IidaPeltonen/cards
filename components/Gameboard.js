import { useState, useEffect } from 'react'
import { Text, View, Pressable } from 'react-native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/style'

let board = []
const NBR_OF_CARDS = 5
const NBR_OF_TAKES = 5
const SUITS = ['cards-heart', 'cards-diamond', 'cards-spade', 'cards-club']

export default function Gameboard () {
  const [nbrOfTakesLeft, setNbrOfTakesLeft] = useState(NBR_OF_TAKES)
  const [status, setStatus] = useState('')

  function checkWinner () {
    let nbrOfRedSuits = 0
    let nbrOfBlackSuits = 0

    for (let i = 0; i < NBR_OF_CARDS; i++) {
      switch(board[i]) {
        case SUITS[0]: case SUITS[1]:
          nbrOfRedSuits++
          break
        case SUITS[2]: case SUITS[3]:
          nbrOfBlackSuits++
          break
        default: break
      }
    }
    if (nbrOfRedSuits === NBR_OF_CARDS || nbrOfBlackSuits === NBR_OF_CARDS) {
      setStatus('5 in a row! Jei!')
    } else if (nbrOfTakesLeft === 0) {
      setStatus('Peli päättyi.')
      setSelectedDices(new Array(NBR_OF_DICES).fill(false))
    } else {
      setStatus('Jatka pelaamista.')
    }
  }

  function takeSuits(i) {
    for (let i = 0; i < NBR_OF_CARDS; i++) {
      let randomSuit = Math.floor(Math.random() * SUITS.length)
      board[i] = SUITS[randomSuit]
    }
    setNbrOfTakesLeft(nbrOfTakesLeft-1)
  }
  function chooseItemColor(suit) {
    switch(suit) {
      case SUITS[0]: case SUITS[1]:
        return 'red'
      case SUITS[2]: case SUITS[3]:
        return 'black'
      default: break
    }
  }

  
  useEffect(() => {
    checkWinner()
    if (nbrOfTakesLeft === NBR_OF_TAKES) {
      setStatus('Peli ei ole alkanut')
    }
    if (nbrOfTakesLeft < 0) {
      nbrOfTakesLeft(NBR_OF_TAKES-1)
    }
  }, [nbrOfTakesLeft])

const row = []
for (let i = 0; i < NBR_OF_CARDS; i++) {
  row.push(
      <MaterialCommunityIcons
        name={board[i]}
        key={'row' + i}
        size={50}
        color={chooseItemColor(board[i])}
      ></MaterialCommunityIcons>
  )
}

return (
    <View style={styles.gameboard}>
        <View style={styles.flex}>{row}</View>
        <Pressable style={styles.button} onPress={() => takeSuits()}>
            <Text style={styles.buttonText}>Take suites!</Text>
        </Pressable>
        <Text style={styles.gameinfo}>Takes left: {nbrOfTakesLeft} </Text>
        <Text style={styles.gameinfo}> {status} </Text>

    </View>
  )
}
