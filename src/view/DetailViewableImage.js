import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, Modal, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { DEVICE_HEIGHT, SCALE_RATIO_WIDTH_BASIS, FS } from '../constants/Constants';

export default class DetailViewableImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  render() {
    const { source, children, defaultSource, sources, styleContent } = this.props;
    const images = [];
    if (sources) {
      sources.forEach(element => {
        if (typeof element === 'number') {
          images.push({
            props: { element }
          });
        } else {
          images.push({
            url: element.uri
          });
        }
      });
    } else if (source) {
      if (typeof source === 'number') {
        images.push({
          props: { source }
        });
      } else {
        images.push({
          url: source.uri
        });
      }
    }

    return (
      <View>
        <Modal
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
        >
          <View style={styles.modalContainer}>
            <ImageViewer
              imageUrls={images}
              enableImageZoom
              enableSwipeDown
              onSwipeDown={() => this.setState({ modalVisible: false })}
              loadingRender={() => <ActivityIndicator size="small" color="white" style={{ marginTop: height / 2 }} />}
              renderImage={props => (
                <Image {...props} resizeMethod="auto" resizeMode="contain" defaultSource={defaultSource} />
              )}
              renderIndicator={images.length > 1 ? undefined : () => null}
            />
            <TouchableOpacity onPress={() => this.setState({ modalVisible: false })} style={styles.iconBackContainer}>
              <MaterialIcons name="keyboard-arrow-left" size={FS(30)} color="white" />
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={() => this.setState({ modalVisible: true })}>
          {children}
          {!children && <Image {...this.props} />}
        </TouchableOpacity>
      </View>
    );
  }
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  iconBackContainer: {
    top: 10 * SCALE_RATIO_WIDTH_BASIS,
    left: 15 * SCALE_RATIO_WIDTH_BASIS,
    paddingVertical: 10 * SCALE_RATIO_WIDTH_BASIS,
    paddingHorizontal: 5 * SCALE_RATIO_WIDTH_BASIS,
    position: 'absolute',
    zIndex: 99,
    elevation: 99
  }
});
