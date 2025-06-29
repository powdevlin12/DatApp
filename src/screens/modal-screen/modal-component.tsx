import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type ModalComponentProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalComponent = ({
  modalVisible,
  setModalVisible,
}: ModalComponentProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      accessible={true}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text>This is a basic modal!</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginBottom: 16,
  },
  modalContent: {
    width: '100%',
    height: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});
