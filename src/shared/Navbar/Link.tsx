import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { stopLoading } from '../../Loading/thunks';
import { JsxElement } from 'typescript';
import React from 'react';
import styled from 'styled-components'


const LinkItem = styled(Link)`
  color: firebrick;
  padding: 0 10px 0 10px;

  &:active{
    border-bottom: 1px solid rgb(230, 230, 230);
    padding-bottom: 0;
    color: navy;
  }

  &:hover{
    color: navy;
    border: none;
    text-decoration: none;
  }
`;

type Props = {
  direction: string,
  children: JsxElement,
  className: string
}

export default (props: Props): unknown => {
  const { direction, children, className } = props;

  const dispatch = useDispatch();
  return (
    <LinkItem
      className={className}
      to={direction}
      onClick={() => dispatch(stopLoading())}
    >
      {children}
    </LinkItem>
  );
};
