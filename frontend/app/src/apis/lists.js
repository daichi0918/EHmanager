import { useCallback } from 'react'
import axios from 'axios';
import { listsIndex } from '../urls/index'
import { listCreate } from '../urls/index'
import { listDestroy } from '../urls/index'

export const fetchLists = (userId) => {
  return axios.get(listsIndex(userId))
    .then(res => {
      return res.data
    })
    .catch((e) => console.error(e))
}

export const createList = (userId, text, setTrigger, setOpen) => {
  return axios.post(listCreate(userId), {
    name: text
  }).then(() => {
    setOpen(false);
    setTrigger((prev) => { return !prev });
    console.log("登録できました")
  })
    .catch((e) => console.error(e))
}

export const destroyList = (userId, id, setTrigger, setConfirm) => {
  return axios.delete(listDestroy(userId, id))
    .then(() => {
      setConfirm(false);
      setTrigger((prev) => { return !prev });
    })
    .catch((e) => console.error(e))
}
