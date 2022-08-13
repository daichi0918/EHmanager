import axios from 'axios';
import { listsIndex } from '../urls/index'

export const fetchLists = (userId) => {
  return axios.get(listsIndex(userId))
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}
