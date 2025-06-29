import React, {lazy, Suspense, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

const ModalComponent = lazy(() => import('./modal-component'));

const ModalScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Show Modal" onPress={() => setModalVisible(true)} />
      {modalVisible && (
        <Suspense fallback={<ActivityIndicator size={'large'} color={'red'} />}>
          <ModalComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </Suspense>
      )}
    </SafeAreaView>
  );
};

export default ModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
