import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {

    const [correo, setCorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');

  
  
    function getErrorMessage(errorCode: any) {
      switch (errorCode) {
        case 'auth/invalid-email':
          return 'El formato del correo electrónico no es válido.';
        case 'auth/user-disabled':
          return 'La cuenta de usuario ha sido deshabilitada.';
        case 'auth/user-not-found':
          return 'No se encontró ningún usuario con este correo.';
        case 'auth/wrong-password':
          return 'La contraseña es incorrecta.';
        case 'auth/email-already-in-use':
          return 'El correo electrónico ya está en uso por otra cuenta.';
        case 'auth/operation-not-allowed':
          return 'El inicio de sesión con correo electrónico y contraseña no está habilitado.';
        case 'auth/weak-password':
          return 'La contraseña proporcionada es demasiado débil.';
        case 'auth/too-many-requests':
          return 'Demasiados intentos de inicio de sesión fallidos. Por favor, intenta de nuevo más tarde.';
        case 'auth/requires-recent-login':
          return 'Esta operación es sensible y requiere autenticación reciente. Inicia sesión nuevamente antes de intentar esta solicitud.';
        case 'auth/network-request-failed':
          return 'La solicitud de red ha fallado. Por favor, verifica tu conexión a internet.';
        case 'auth/internal-error':
          return 'Ha ocurrido un error interno. Por favor, inténtalo de nuevo.';
        case 'auth/invalid-credential':
          return 'Las credenciales proporcionadas no son válidas.';
        case 'auth/invalid-verification-code':
          return 'El código de verificación proporcionado no es válido.';
        case 'auth/invalid-verification-id':
          return 'El ID de verificación proporcionado no es válido.';
        default:
          return 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.';
      }
    }
  
    function login() {
      signInWithEmailAndPassword(auth, correo, contrasenia)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigation.navigate("Drawer");
          setCorreo('');
          setContrasenia('');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = getErrorMessage(errorCode);
          console.log(`Error Code: ${errorCode}, Message: ${error.message}`);
          Alert.alert("Error de Autenticación", errorMessage);
        });
    }
  
      const resetearCampos = () => {
      setCorreo('');
      setContrasenia('');
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGIN</Text>
      <Image
        source={require('../assets/login.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese correo"
        placeholderTextColor="#888"
        onChangeText={(texto) => setCorreo(texto)}
        keyboardType='email-address'
        autoCapitalize='none'
        autoCorrect={false}
        value={correo}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese contraseña"
        placeholderTextColor="#888"
        onChangeText={(texto) => setContrasenia(texto)}
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false}
        value={contrasenia}
      />
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Color de fondo
  },
  title: {
    fontSize: 36, // Tamaño del título
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff', // Color del título
  },
  image: {
    width: '70%', // Ancho ocupando todo el espacio disponible
    height: '40%', // Ajustado a un tamaño específico o a un porcentaje del contenedor
    marginBottom: 5,
    borderRadius: 10, // Borde redondeado
  },
  input: {
    width: '80%', // Ancho del input
    backgroundColor: '#fff', // Color de fondo del input
    paddingVertical: 15, // Padding vertical
    paddingHorizontal: 20, // Padding horizontal
    marginBottom: 15,
    borderRadius: 8, // Borde redondeado
    fontSize: 16, // Tamaño del texto
    color: '#333', // Color del texto
    borderWidth: 1, // Grosor del borde
    borderColor: '#ccc', // Color del borde
  },
  button: {
    backgroundColor: '#007bff', // Color de fondo del botón
    paddingVertical: 12, // Padding vertical
    paddingHorizontal: 40, // Padding horizontal
    borderRadius: 8, // Borde redondeado
    marginBottom: 10,
    width: '70%', // Ancho del botón
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 18, // Tamaño del texto
    textAlign: 'center',
    fontWeight: 'bold', // Peso de la fuente en negrita
  },
  textoDebajo: {
    marginTop: 20,
    fontSize: 14, // Tamaño del texto debajo
    color: '#555', // Color del texto debajo
  },
});


