import { useDispatch } from 'react-redux';
import { stopLoading } from '../../Loading/thunks';
import { JsxElement } from 'typescript';
import React from 'react';
import { LinkItem } from './styled'


type Props = {
  direction: string,
  children: JsxElement,
  className: string
}

// eslint-disable-next-line no-undef
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
