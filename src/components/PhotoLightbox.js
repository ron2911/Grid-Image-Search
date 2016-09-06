import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-image-lightbox';

export default class PhotoLightbox extends Component {
  static propTypes = {
    index: PropTypes.number,
    photos: PropTypes.array,
    showLightbox: PropTypes.bool,
    callbackParent: PropTypes.func,
  };

  state = {
    index: this.props.index,
    isOpen: this.props.showLightbox,
  }

  closeLightbox() {
    this.setState({ isOpen: false });
    var showLightbox = this.state.isOpen;
    this.props.callbackParent(showLightbox);
  }

  moveNext() {
    this.setState({ index: (this.state.index + 1) % this.props.photos.length });
  }

  movePrev() {
    this.setState({ index: (this.state.index + this.props.photos.length - 1) % this.props.photos.length });
  }

  render() {
    var lightbox = '';
    var mainSrcUrl = `http://farm${this.props.photos[this.state.index].farm}.staticflickr.com/${this.props.photos[this.state.index].server}/${this.props.photos[this.state.index].id}_${this.props.photos[this.state.index].secret}_b.jpg`
    var nextSrcUrl = `http://farm${this.props.photos[this.state.index].farm}.staticflickr.com/${this.props.photos[this.state.index].server}/${this.props.photos[this.state.index].id}_${this.props.photos[this.state.index].secret}_b.jpg`
    var prevSrcUrl = `http://farm${this.props.photos[this.state.index].farm}.staticflickr.com/${this.props.photos[this.state.index].server}/${this.props.photos[this.state.index].id}_${this.props.photos[this.state.index].secret}_b.jpg`
    if (this.state.isOpen) {
      lightbox = (
        <Lightbox
          mainSrc={mainSrcUrl}
          nextSrc={nextSrcUrl}
          prevSrc={prevSrcUrl}

          onCloseRequest={this.closeLightbox.bind(this)}
          onMovePrevRequest={this.movePrev.bind(this)}
          onMoveNextRequest={this.moveNext.bind(this)}
        />
      );
    }
    return (
      <div className="photo-lightbox">
        {lightbox}
      </div>
    );
  }
}
