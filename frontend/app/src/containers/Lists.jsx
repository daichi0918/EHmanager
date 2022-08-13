import React, { Fragment, useEffect } from 'react';

// apis
import { fetchLists } from '../apis/lists';

export const Lists = ({
  match
}) => {

  useEffect(() => {
    fetchLists(match.params.usersId)
      .then((data) =>
        console.log(data)
      )
  }, [])

  return (
    <Fragment>
      リスト一覧
    </Fragment>
  )
}
