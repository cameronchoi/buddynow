import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import SubmitButton from "../components/UI/SubmitButton";
import MultiLineInput from "../components/UI/MultiLineInput";
import MediumText from "../components/UI/MediumText";
import NormalText from "../components/UI/NormalText";
import BackArrow from "../components/UI/BackArrow";

import { SignUpContext } from "../context/SignUpContext";

export default function FriendSignUpScreen({ navigation }) {
  const [signUpState, dispatch] = useContext(SignUpContext);
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const getWordCount = (text) => {
    const arr = text.split(" ");
    if (arr[arr.length - 1] === "") {
      return arr.length - 1;
    }
    return arr.length;
  };

  return (
    <View>
      <BackArrow
        onPress={() => {
          navigation.goBack();
        }}
      />
      <MediumText style={styles.title}>
        What do you look for in a friend?
      </MediumText>
      <View style={{ alignItems: "center" }}>
        <View style={styles.topText}>
          <NormalText style={{ fontSize: 12, color: "#a9a9a9" }}>
            Please write at least 50 words. We will be using this to match you
            to others with similar personalities and interests.
          </NormalText>
        </View>
        <MultiLineInput
          placeholder="What kind of qualities do you admire? What kind of values would your friend have? etc..."
          onChangeText={(text) => {
            setText(text);
            setWordCount(getWordCount(text));
          }}
          value={text}
          style={styles.input}
        />
        <View
          style={{ alignSelf: "flex-start", marginLeft: 40, marginBottom: 40 }}
        >
          <NormalText
            style={{ fontSize: 12, color: "#a9a9a9" }}
          >{`${wordCount}/50`}</NormalText>
        </View>
        <SubmitButton
          onPress={() => {
            if (wordCount < 50) {
              alert("Please input at least 50 words");
            } else {
              dispatch({ type: "DESCRIBE_FRIEND", describeFriend: text });
              navigation.navigate("AvatarSignUp");
            }
          }}
        >
          Continue
        </SubmitButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, marginLeft: 30, marginTop: 20 },
  input: {
    marginTop: 40,
  },
  bottomText: {
    paddingHorizontal: 35,
    marginTop: 10,
    marginBottom: 50,
  },
  topText: {
    paddingHorizontal: 35,
    marginTop: 10,
  },
});
