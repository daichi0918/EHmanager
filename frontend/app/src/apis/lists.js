import axios from 'axios';
import { listsIndex } from '../urls/index'
import { listDestroy } from '../urls/index'

export const fetchLists = (userId) => {
  return axios.get(listsIndex(userId))
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}

export const destroyList = (userId, id) => {
  return axios.delete(listDestroy(userId, id))
    .then(() => {
      console.log("削除ID:", id)
    })
    .catch((e) => console.error(e))
}
