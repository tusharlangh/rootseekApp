import { StyleSheet, View } from 'react-native';
import LoginPage from './components/login-section/login';

export default function App() {
  return (
    <View style={styles.container}>
      <LoginPage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: "black"
  }
});
