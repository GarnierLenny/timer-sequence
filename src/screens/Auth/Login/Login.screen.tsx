import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { commonStyles } from "../../../utils/styles.utils";
import LoginTitle from "./components/LoginTitle.component";
import LoginForm from "./components/LoginForm.component";
import { getAuth } from "firebase/auth";
import { app } from "../../../utils/firebase/firebase.utils";
import { UserContext } from "../../../utils/context.utils";

const Login = ({ navigation }) => {
  const auth = getAuth(app);
  const {user, setUser} = useContext(UserContext);

  const onAuthStateChanged = (user: Object) => {
    if (user === null) return;
    navigation.navigate('TabParent');
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <SafeAreaView style={{ ...commonStyles.viewWrapper, flex: 1 }}>
      <LoginTitle />
      <LoginForm navigation={navigation} />
    </SafeAreaView>
  );
};

export default Login;
