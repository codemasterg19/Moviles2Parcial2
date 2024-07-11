import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Asegúrate de importar correctamente la función de Firebase
import { auth, db } from '../config/Config'; // Asegúrate de importar correctamente la configuración de Firebase
import { getDatabase, ref, set } from 'firebase/database';

export default function RegistroScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [usuario, setUsuario] = useState('');
  const [numeroCelular, setNumeroCelular] = useState('');



  function getErrorMessage(errorCode: any) {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso por otra cuenta.';
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.';
      case 'auth/operation-not-allowed':
        return 'La operación no está permitida. Por favor, contacta al soporte.';
      case 'auth/weak-password':
        return 'La contraseña proporcionada es demasiado débil.';
      case 'auth/network-request-failed':
        return 'La solicitud de red ha fallado. Por favor, verifica tu conexión a internet.';
      case 'auth/internal-error':
        return 'Ha ocurrido un error interno. Por favor, inténtalo de nuevo.';
      case 'auth/requires-recent-login':
        return 'Esta operación es sensible y requiere autenticación reciente. Inicia sesión nuevamente antes de intentar esta solicitud.';
      default:
        return 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.';
    }
  }


  function registrarUsuario() {
    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Usuario registrado:', user.uid);

        // Guardar los datos en la base de datos
        guardarRegistro(user.uid);

        // Navegar a la pantalla de login después del registro exitoso
        Alert.alert(
            "Registro Exitoso",
            "El usuario se ha registrado correctamente.",
            [{ text: "OK", onPress: () => navigation.navigate("Login") }]
          );

        // Reiniciar los estados de los campos de texto
        setCorreo('');
        setContrasenia('');
        setUsuario('');
        setNumeroCelular('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = getErrorMessage(errorCode);
        console.log(`Error Code: ${errorCode}, Message: ${error.message}`);
        Alert.alert("Error de Registro", errorMessage);
      });
  }

  function guardarRegistro(userId: string) {
    // Utilizamos userId como parte de los datos a guardar en la base de datos
    set(ref(db, `usuarios/${userId}`), {
      correo: correo,
      contrasenia: contrasenia,
      usuario: usuario,
      numeroCelular: numeroCelular
    })
      .then(() => {
        console.log('Datos guardados en la base de datos para el usuario:', userId);
      })
      .catch((error) => {
        console.error('Error al guardar en la base de datos:', error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRO</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Ingrese usuario"
        placeholderTextColor="#888"
        onChangeText={(texto) => setUsuario(texto)}
        autoCapitalize='none'
        autoCorrect={false}
        value={usuario}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese número de celular"
        placeholderTextColor="#888"
        onChangeText={(texto) => setNumeroCelular(texto)}
        keyboardType='phone-pad'
        autoCapitalize='none'
        autoCorrect={false}
        value={numeroCelular}
      />
      <TouchableOpacity style={styles.button} onPress={registrarUsuario}>
        <Text style={styles.buttonText}>Registro</Text>
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
});


