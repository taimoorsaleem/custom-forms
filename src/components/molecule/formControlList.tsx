import { FC } from 'react';
import styled from 'styled-components';

import { IFormControl } from '../../utils/constants';
import { FormControlItem } from './formControlItem';

const StyledFormControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  items: Array<IFormControl>;
};

export const FormControlList: FC<Props> = ({ items }) => {
  return (
    <StyledFormControlsContainer>
      {items?.map((item: IFormControl) => (
        <FormControlItem key={item.label} item={item} />
      ))}
    </StyledFormControlsContainer>
  );
};
