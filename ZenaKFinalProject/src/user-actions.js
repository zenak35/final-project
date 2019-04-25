import React from "react";
import {
  View,
  TouchableHighlight,
  Text,
  Alert,
  StyleSheet
} from "react-native";

const styles = StyleSheet.create({
  actionsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10
  },
  actionButton: {
    padding: 10,
    color: "white",
    borderRadius: 6,
    width: 80,
    backgroundColor: "#808080",
    marginRight: 5,
    marginLeft: 5
  },
  actionButtonDestructive: {
    backgroundColor: "#ff4b21"
  },
  actionButtonText: {
    textAlign: "center"
  }
});

const UserActions = (props) => {
  console.log(props);
  return (
    <View style={styles.actionsContainer}>
      <TouchableHighlight
        style={styles.actionButton}
        onPress={() => {
          Alert.alert("Tips", "You could do something with this edit action!");
        }}
      >
        <Text style={styles.actionButtonText}>Edit</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={[styles.actionButton, styles.actionButtonDestructive]}
        onPress={() => {
          Alert.alert(
            "Tips",
            "You could do something with this remove action!"
          );
        }}
      >
        <Text style={styles.actionButtonText}>Remove</Text>
      </TouchableHighlight>
    </View>
  );
};

export default UserActions;
