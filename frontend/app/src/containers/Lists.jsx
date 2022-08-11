import React, { Fragment } from 'react';

export const Lists = ({
  match
}) => {
  return (
    <Fragment>
      リスト一覧
      <p>
        usersIdは {match.params.usersId} です
      </p>
    </Fragment>
  )
}
