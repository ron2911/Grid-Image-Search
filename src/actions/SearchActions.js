import * as types from '../constants/SearchActionTypes';
import photoSearch from '../api/PhotoSearch';

function searchWithPhotoAPI(tag, page, dispatch) {
  if (page >= 2) {
    dispatch({
      type: types.SEARCH_PENDING_FOR_NEXT,
    });
  }else {
    dispatch({
      type: types.SEARCH_PENDING,
    });
  }

  photoSearch(tag, page, (data) => {
    dispatch({
      type: types.SEARCH_DONE,
      photos: data.photos.photo,
      page,
      tag,
    });
  });
}

export function searchNextPageAction() {
  return (dispatch, getState) =>{
    const page = getState().photos.page + 1;
    const tag = getState().photos.tag;
    searchWithPhotoAPI(tag, page, dispatch);
  };
}

export function searchPhotoAction(tag = 'dogs', page = 1) {
  return (dispatch) => {
    searchWithPhotoAPI(tag, page, dispatch);
  };
}
