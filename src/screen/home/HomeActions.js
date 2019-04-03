// import { BASE_URL } from '../../../constants/Constants'
import request from '../../utils/request';

const LIMIT = 10;

// export const loadCategory = () =>
//   new Promise((resolve, reject) => {
//     request.get('http://18.208.149.33:4000/api/category').finish((err, res) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(res.body.data);
//       }
//     });
//   });

// export const loadMoreCashHistory = (id, page) =>
//   new Promise((resolve, reject) => {
//     request
//       .get(`${BASE_URL}cash_history?fields=["$all"]&filter={"user_id":"${id}"}&limit=${LIMIT}&page=${page}`)
//       .finish((err, res) => {
//         // console.log('loadMoreWalletExport', res);
//         if (err) {
//           reject(err)
//         } else {
//           resolve(res.body.results.objects.rows)
//         }
//       })
//   })

// export const refreshCashHistory = id =>
//   new Promise((resolve, reject) => {
//     request
//       .get(`${BASE_URL}cash_history?fields=["$all"]&filter={"user_id":"${id}"}&limit=${LIMIT}&page=1`)
//       .finish((err, res) => {
//         // console.log('refreshWalletExport', res);
//         if (!err) {
//           resolve(res.body.results.objects.rows)
//         } else {
//           reject(err)
//         }
//       })
//   })
