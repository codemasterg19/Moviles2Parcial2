import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface OperacionItemProps {
  id: string;
  monto: number;
  tipo: string;
  comentario: string;
  onSelect: (comentario: string) => void;
}

const OperacionItem: React.FC<OperacionItemProps> = ({ id, monto, tipo, comentario, onSelect }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onSelect(comentario)}>
      <Text style={styles.itemText}>ID: {id}</Text>
      <Text style={styles.itemText}>Monto: {monto}</Text>
      <Text style={styles.itemText}>Tipo: {tipo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default OperacionItem;
