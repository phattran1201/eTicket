import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';
import { ToastAndroid } from 'react-native';

export const loadSearchByKeyword = (keyword, page = 1) =>
  new Promise((resolve, reject) => {
    request
      .post(`https://eticket-vhu.herokuapp.com/api/v1/eticket/search-event?keyword=${keyword}&limit=10&page=${page}`)
      .finish((err, res) => {
        if (err) {
          ToastAndroid.show(`Kiểm tra kết nối mạng!\n Lỗi loadSearchByKeyword: ${err}`, ToastAndroid.LONG);
          reject(err);
        } else {
          resolve(res.body.data);
        }
      });
  });
export const loadSearchByOption = (page = 1, time = '', categoryId = '', free = '') =>
  new Promise((resolve, reject) => {
    let TIME = '';
    let CATEGOTY = '';
    let FREE = '';

    if (time && time !== 'All') {
      TIME = `time=${time}&`;
    }
    if (categoryId && categoryId !== 'All') {
      CATEGOTY = `category_id=${categoryId}&`;
    }
    if (free && free !== 'All') {
      FREE = `free_or_not=${free}&`;
    }

    request
      .post(
        `https://eticket-vhu.herokuapp.com/api/v1/eticket/search-event?${TIME}${CATEGOTY}${FREE}limit=10&page=${page}`
      )
      .finish((err, res) => {
        console.log('dauphaiphat: res', res);
        console.log('dauphaiphat: err', err);
        if (err) {
          ToastAndroid.show(`Kiểm tra kết nối mạng!\n Lỗi loadSearchByKeyword: ${err}`, ToastAndroid.LONG);
          reject(err);
        } else {
          resolve(res.body.data);
        }
      });
  });
