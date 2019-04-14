import { BASE_URL, CONSTANTS_KEY } from '../../constants/Constants';
import request from '../../utils/request';
import { ToastAndroid } from 'react-native';

export const loadSearchByKeyword = (keyword, page = 1) =>
  new Promise((resolve, reject) => {
    request
      .post(`https://eticket-vhu.herokuapp.com/api/v1/eticket/search-event?keyword=${keyword}&limit=10&page=${page}`)
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
