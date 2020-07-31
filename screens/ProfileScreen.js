import React, { useContext, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { AuthContext } from '../context/AuthContext'
import ProfilePicture from '../components/UI/ProfilePicture'
import MediumText from '../components/UI/MediumText'
import NormalText from '../components/UI/NormalText'

import AvatarModal from '../components/UI/AvatarModal'
import Colours from '../constants/colours'
import StartButton from '../components/UI/StartButton'
import { set } from 'react-native-reanimated'

export default function ProfileScreen ({ navigation }) {
  const [state, dispatch] = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false)
  const [topType, setTopType] = useState('')
  const [hairColour, setHairColour] = useState('')
  const [clotheType, setClotheType] = useState('')
  const [skinColour, setSkinColour] = useState('')
  const [subjects, setSubjects] = useState([])
  const [uniName, setUniName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [degree, setDegree] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`https://unify-40e9b.firebaseio.com/users/${state.userId}.json`)
      .then(res => res.json())
      .then(resData => {
        for (const key in resData) {
          setTopType(resData[key].avatar.topType)
          setHairColour(resData[key].avatar.hairColour)
          setClotheType(resData[key].avatar.clotheType)
          setSkinColour(resData[key].avatar.skinColour)
          setSubjects(resData[key].subjects)
          setUniName(resData[key].uniName)
          setDegree(resData[key].degree)
          setFirstName(resData[key].firstName)
          setLastName(resData[key].lastName)
        }
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AvatarModal
        currentTopType={topType}
        currentHairColour={hairColour}
        currentClotheType={clotheType}
        currentSkinColour={skinColour}
        saveHandler={(topType, hairColour, clotheType, skinColour) => {
          setTopType(topType)
          setHairColour(hairColour)
          setClotheType(clotheType)
          setSkinColour(skinColour)
        }}
        modalOpen={modalOpen}
        backHandler={() => setModalOpen(false)}
      />
      <TouchableOpacity
        style={styles.picture}
        onPress={() => setModalOpen(true)}
      >
        <ProfilePicture
          size='medium'
          uri={`https://avataaars.io/png?topType=${topType}&hairColor=${hairColour}&clotheType=${clotheType}&skinColor=${skinColour}&avatarStyle=Circle`}
        />
      </TouchableOpacity>
      <MediumText style={{ fontSize: 20, marginBottom: 5 }}>
        {`${firstName} ${lastName}`}
      </MediumText>
      <View
        style={{
          width: 300,
          borderRadius: 10,
          alignItems: 'center',
          padding: 10,
          marginVertical: 20,
          backgroundColor: Colours.primary
        }}
      >
        <NormalText style={{ fontSize: 16, marginBottom: 5, color: 'white' }}>
          {uniName}
        </NormalText>
      </View>
      <View
        style={{
          width: 300,
          borderRadius: 10,
          alignItems: 'center',
          padding: 10,
          marginBottom: 20,
          backgroundColor: Colours.primary
        }}
      >
        <NormalText style={{ fontSize: 16, marginBottom: 5, color: 'white' }}>
          {degree}
        </NormalText>
      </View>
      <View
        style={{
          width: 300,
          backgroundColor: Colours.primary,
          borderRadius: 10,
          alignItems: 'center',
          paddingTop: 15,
          paddingBottom: 20,
          marginBottom: 50
        }}
      >
        <NormalText
          style={{
            fontSize: 16,
            marginBottom: 5,
            alignItems: 'center',
            color: 'white'
          }}
        >
          Subjects
        </NormalText>
        <FlatList
          style={{ marginTop: 10 }}
          numColumns={2}
          keyExtractor={item => Math.random()}
          data={subjects}
          renderItem={({ item }) => (
            <View style={styles.subjectText}>
              <Text style={{ color: 'white' }}>{item}</Text>
            </View>
          )}
        />
      </View>
      <StartButton
        onPress={() => {
          dispatch({ type: 'SIGN_OUT' })
        }}
        title='Sign Out'
        style={{
          backgroundColor: Colours.secondary,
          marginBottom: 100
        }}
        textColour='white'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  picture: {
    marginTop: 50,
    marginBottom: 20
  },
  subjectText: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 3,
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 30,
    width: 90
  }
})
