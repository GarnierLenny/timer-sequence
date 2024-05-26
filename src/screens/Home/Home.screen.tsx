import React, { useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from "../../utils/styles.utils";
import { Text } from 'react-native-paper';
import { getAuth } from "firebase/auth";

const Home = () => {
  // useEffect(() => {
  //   getAuth().signOut();
  // }, []);

  return (
    <SafeAreaView style={{ ...commonStyles.viewWrapper, flex: 1 }}>
      <Text>Home screen</Text>
    </SafeAreaView>
  );
};

export default Home;
