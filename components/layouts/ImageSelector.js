import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import { Thumbnail } from 'native-base';

const ImgPicker = props => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {props.pickedImage && <Thumbnail source={{ uri: props.pickedImage }} size={50} />}
      <Button
        title='Pick an image from camera roll'
        onPress={props.takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default ImgPicker;
