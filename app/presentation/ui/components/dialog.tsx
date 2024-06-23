import { Colors } from "@/app/utils/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
interface DialogComponentProps {
  visible: boolean;
  child: React.JSX.Element;
  onClose: () => void;
}
const DialogComponent = ({ visible, onClose, child }: DialogComponentProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{child}</View>
          <Pressable style={styles.close} onPress={onClose}>
            <Ionicons name="close" size={25} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.transparent.color,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
  },
  close: {
    position: "absolute",
    end: 0,
    top: 0,
    marginEnd: 32,
    marginTop: 16,
  },
  modalView: {
    backgroundColor: Colors.semantic_bg_white.color,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: Colors.black.color,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default DialogComponent;
