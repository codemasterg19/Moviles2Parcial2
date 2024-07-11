import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { onValue, ref } from 'firebase/database';
import { db } from '../config/Config';

const HistorialScreen: React.FC = () => {
  const [operaciones, setOperaciones] = useState<any[]>([]);

  useEffect(() => {
    // Cargar las operaciones desde Firebase al cargar el componente
    leerOperaciones();
  }, []);

  // Función para cargar las operaciones desde Firebase
  const leerOperaciones = () => {
    const operacionesRef = ref(db, 'operaciones');

    onValue(operacionesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const listaOperaciones = Object.keys(data).map((id) => ({ id, ...data[id] }));
        setOperaciones(listaOperaciones);
      } else {
        setOperaciones([]);
      }
    });
  };

  // Función para manejar la selección de una operación
  const seleccionarOperacion = (comentario: string) => {
    Alert.alert('Comentario de la operación', comentario);
  };

  // Componente de renderizado de cada elemento en la lista
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.item} onPress={() => seleccionarOperacion(item.comentario)}>
      <Text style={styles.itemText}>ID: {item.id}</Text>
      <Text style={styles.itemText}>Monto: {item.monto}</Text>
      <Text style={styles.itemText}>Tipo: {item.tipo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Operaciones</Text>
      <FlatList
        data={operaciones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay operaciones registradas.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default HistorialScreen;
