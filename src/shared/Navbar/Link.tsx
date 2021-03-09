import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { stopLoading } from '../../Store/actions/Loading';
import styled from 'styled-components'
import { JsxElement } from 'typescript';


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
  className: Object
}

export default ( props: Props ) => {
  const {direction, children, className} = props;

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