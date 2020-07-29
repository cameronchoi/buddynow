import React, { useState, useContext } from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import SubmitButton from '../components/UI/SubmitButton'
import Input from '../components/UI/Input'
import MediumText from '../components/UI/MediumText'
import BackArrow from '../components/UI/BackArrow'

import { SignUpContext } from '../context/SignUpContext'

export default function EmailSignUpScreen ({ navigation }) {
  const [state, dispatch] = useContext(SignUpContext)
  const [text, setText] = useState('')
  return (
    <View>
      <BackArrow
        onPress={() => {
          navigation.goBack()
        }}
      />
      <MediumText style={styles.title}>My email is...</MediumText>
      <View style={{ alignItems: 'center' }}>
        <Input
          onChangeText={text => setText(text)}
          value={text}
          placeholder='Email Address'
          style={styles.test}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <SubmitButton
          onPress={() => {
            dispatch({ type: 'EMAIL', email: text })
            navigation.navigate('PasswordSignUp')
          }}
        >
          Continue
        </SubmitButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: { fontSize: 20, marginLeft: 30, marginTop: 20 },
  test: {
    marginTop: 40,
    marginBottom: 70
  }
})
