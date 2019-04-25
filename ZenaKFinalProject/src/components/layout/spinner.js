import React from 'react';
import spinner from './spinner.gif';
import { View } from "react-native";

export default () => {
  return (
    <View>
      <div>
        <img
          src={spinner}
          alt="Loading..."
          style={{ width: '200px', margin: ' 40px auto', display: 'block' }}
        />
      </div>
    </View>
  );
};
