import React, { Fragment, useReducer, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { Link } from "react-router-dom";

// components
// import Skeleton from '@material-ui/lab/Skeleton';

// apis
import { fetchUsers } from '../../apis/users';

import {
  initialState,
  usersActionTyps,
  usersReducer,
} from '../../reducers/users';
import { HeaderOnly } from '../templates/HeaderOnly';
import { UserContext } from '../../providers/UserProvider';

// constants
// import { REQUEST_STATE } from '../constants';

// const UsersContentsList = styled.div`
//   display: flex;
//   justify-content: space-around;
//   margin-bottom: 150px;
// `;

// const UsersContentWrapper = styled.div`
//   width: 450px;
//   height: 15px;
//   padding: 48px;
// `;

const MainText = styled.p`
  color: blue;
  font-size: 18px;
  text-align: center;
`;

const SubText = styled.p`
  color: black;
  font-size: 12px;
  text-align: center;
`;

// const CustomizedBox = styled(Box)`
//   background: gray;
//   width: 15;
//   height: 100;
// `;

const Waku = styled.div`
  width: 200px;
  height: 100px;
  margin-bottom: 15px;
  margin-left: 30px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,.2);
`;

export const Users = () => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const context = useContext(UserContext);
  console.log(context)

  useEffect(() => {
    dispatch({ type: usersActionTyps.FETCHING });
    fetchUsers()
      .then((data) =>
        dispatch({
          type: usersActionTyps.FETCH_SUCCESS,
          payload: {
            users: data.users
          }
        })
      )
  }, [])

  return (
    <Fragment>
      ユーザー一覧
      {
        state.usersList.map((item, index) =>
          <Link to={`/users/${item.id}/lists`} key={index} style={{ textDecoration: 'none' }}>
            <Waku>
              <MainText>{item.name}</MainText>
              <SubText>{item.email}</SubText>
              <SubText>{item.gender}</SubText>
            </Waku>
          </Link>
        )
      }
    </Fragment>
  )
}
