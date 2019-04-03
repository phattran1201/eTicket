import request from '../../utils/request';

export const loadCategory = () =>
  new Promise((resolve, reject) => {
    request.get('http://18.208.149.33:4000/api/category').finish((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.body.data);
      }
    });
  });
export const loadAlbumById = id =>
  new Promise((resolve, reject) => {
    request.get(`http://18.208.149.33:4000/api/album?categorys=${id}`).finish((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.body.data);
      }
    });
  });
export const loadDetailAlbumById = (seoUrl, albumId) =>
  new Promise((resolve, reject) => {
    request.get(`http://18.208.149.33:4000/api/album/images?seoUrl=${seoUrl}&albumId=${albumId}`).finish((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.body.data);
      }
    });
  });
