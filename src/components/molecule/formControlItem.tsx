import { FC, useRef } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';
import { AiOutlineDrag } from 'react-icons/ai';

import { IFormControl } from '../../utils/constants';

const StyledFormControlItemContainer = styled.div`
  margin-bottom: 12px;
  border-radius: 16px;
  border: 1px dashed;
  width: calc(100% - 16px);
  padding: 4px 8px;
  cursor: pointer;
`;

const StyledAiIcon = styled(AiOutlineDrag)`
  vertical-align: middle;
  height: 24px;
  width: auto;
`;

type Props = {
  item: IFormControl;
};

export const FormControlItem: FC<Props> = ({ item }) => {
  const ref = useRef(null);
  const [{ opacity }, drag] = useDrag({
    type: 'item',
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    item: { type: item.type },
  });
  drag(ref);
  
  return (
    <StyledFormControlItemContainer ref={ref} style={{ opacity }}>
      <StyledAiIcon />
      <span style={{ verticalAlign: 'middle', marginLeft: 8 }}>
        {item.label}
      </span>
    </StyledFormControlItemContainer>
  );
};
