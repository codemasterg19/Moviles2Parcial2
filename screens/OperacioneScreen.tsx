import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { set, ref } from 'firebase/database';
import { db } from '../config/Config';

export default function OpercioneScreen({ navigation }: any) {
  const [idOperacion, setIdOperacion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('');
  const [comentario, setComentario] = useState('');

  function guardarOperacion() {
    // Validar que los campos no estén vacíos
    if (!idOperacion || !monto || !tipoOperacion) {
      Alert.alert('Campos requeridos', 'Por favor completa todos los campos.');
      return;
    }

    // Guardar los datos en la base de datos
    set(ref(db, `operaciones/${idOperacion}`), {
      id: idOperacion,
      monto: monto,
      tipo: tipoOperacion,
      comentario: comentario,
    })
      .then(() => {
        console.log('Operación guardada en la base de datos');
        Alert.alert('Operación Guardada', 'La operación se ha guardado correctamente.');
        // Limpiar los campos después de guardar
        setIdOperacion('');
        setMonto('');
        setTipoOperacion('');
        setComentario('');
      })
      .catch((error) => {
        console.error('Error al guardar la operación:', error);
        Alert.alert('Error', 'Hubo un problema al intentar guardar la operación. Por favor inténtalo de nuevo.');
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Operación</Text>
      <TextInput
        style={styles.input}
        placeholder="ID de Operación"
        placeholderTextColor="#888"
        onChangeText={(texto) => setIdOperacion(texto)}
        value={idOperacion}
      />
      <TextInput
        style={styles.input}
        placeholder="Monto"
        placeholderTextColor="#888"
        onChangeText={(texto) => setMonto(texto)}
        keyboardType="numeric"
        value={monto}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de Operación"
        placeholderTextColor="#888"
        onChangeText={(texto) => setTipoOperacion(texto)}
        value={tipoOperacion}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentario (opcional)"
        placeholderTextColor="#888"
        onChangeText={(texto) => setComentario(texto)}
        value={comentario}
      />
      <TouchableOpacity style={styles.button} onPress={guardarOperacion}>
        <Text style={styles.buttonText}>Ejecutar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
    width: '70%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
