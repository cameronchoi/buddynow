import React, { useState, useEffect, useCallback, useContext } from 'react'
import { SafeAreaView } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { MatchContext } from '../context/MatchContext'

export default function MessagingScreen () {
  const [messages, setMessages] = useState([])
  const [matchState] = useContext(MatchContext)
  const chat = (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
    />
  )

  useEffect(() => {
    // change to actually request
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    )
  }, [])

  return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>
}
