import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME</Text>
      <Image
        source={require('../assets/fondo.jpg')}
        style={styles.image}
        resizeMode="cover" // Cambiado a cover para llenar el espacio del image container
      />
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Registro')}>
        <Text style={styles.buttonText}>Registro</Text>
      </TouchableOpacity>
      <Text style={styles.textoDebajo}>Desarrollado por: Pablo Jiménez</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dee6f2', // Color de fondo
  },
  title: {
    fontSize: 36, // Aumentado el tamaño del título
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff', // Color del título
  },
  image: {
    width: '90%', // Ancho ocupando todo el espacio disponible
    height: '40%', // Ajustado a un tamaño específico o a un porcentaje del contenedor
    marginBottom: 20,
    borderRadius: 10, // Agregado borde redondeado
  },
  button: {
    backgroundColor: '#007bff', // Color de fondo del botón
    paddingVertical: 10, // Aumentado el padding vertical
    paddingHorizontal: 40,
    borderRadius: 8, // Ajustado el radio del borde
    marginBottom: 10,
    width: '70%', // Ancho del botón ajustado
  },
  buttonText: {
    color: '#fff', // Color del texto del botón
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold', // Añadido peso de la fuente en negrita
  },
  textoDebajo: {
    marginTop: 20,
    fontSize: 14, // Disminuido el tamaño del texto debajo
    color: '#555', // Color del texto debajo de los botones
  },
});


