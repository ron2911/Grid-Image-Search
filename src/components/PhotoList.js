import React, { Component, PropTypes } from 'react';
import PhotoLightbox from './PhotoLightbox';

export default class PhotoList extends Component {
  static propTypes = {
    actions: PropTypes.object,
    photos: PropTypes.array,
    status: PropTypes.string,
  };

  state = {
    index: 0,
    photos: this.props.photos,
    showLightbox: false,
  }

  // doing a default load here first
  componentDidMount() {
    this.props.actions.searchPhotoAction();
  }

  loadMore() {
    this.props.actions.searchNextPageAction();
  }

  openLightbox(index) {
    this.setState({
      index: index,
      photos: this.props.photos,
      showLightbox: true,
    });
  }

  closeLightbox(newState) {
    this.setState({
      showLightbox: newState,
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          {
              this.props.photos.map((item, index) => {
                return (
                  <div className="col-md-3 image-item" key={`Photo_${item.id}_${index}`}>
                    <img onClick={this.openLightbox.bind(this, index)} src={`http://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_q.jpg`}/>
                  </div>
                );
              })
          }
          <div className="clearfix" />
        </div>

        {
          (() => {
            if (this.props.status === 'DONE') {
              return (
                <div className="row load-more-button-container">
                  <div className="col-md-6 col-md-offset-3">
                    <button onClick={this.loadMore.bind(this)} type="button" className="btn btn-default btn-lg btn-block">Load More</button>
                  </div>
                </div>
              );
            }
          })()
        }
        {this.state.showLightbox ? 
          <PhotoLightbox callbackParent={this.closeLightbox.bind(this)} index={this.state.index} photos={this.state.photos} showLightbox={this.state.showLightbox}/> :
          null
        }
      </div>
    );
  }
}
