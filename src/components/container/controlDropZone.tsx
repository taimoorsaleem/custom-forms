import { useRef, FC } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

import { dragTypeValue, dragTypes } from '../../utils/constants';
import { FormFieldItem } from '../molecule/formFieldItem';
import { getFieldIndex } from '../../utils';
import { IFormControl } from './ducks/formSlice';

const StyledControlDropZoneContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 600px;
`;

type Props = {
  formComponents: Array<IFormControl> ;
  setFormControls: Function;
  updateFormControls: Function;
};

export const ControlDropZone: FC<Props> = ({
  formComponents,
  setFormControls,
  updateFormControls,
}) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: dragTypeValue,
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
    drop: (item: any, monitor) => {
      const controls = formComponents.slice();
      if (item.dragType === dragTypes.RE_ARRANGE) {
        controls.splice(item.index, 1);
      }
      delete item?.dragType;
      delete item?.index;
      const clinetOffset = monitor.getClientOffset();
      const index = getFieldIndex(controls, clinetOffset);
      controls.splice(index, 0, {
        ...item,
        ypixel: clinetOffset?.y,
        position: index,
        ...(item.dragType === dragTypes.RE_ARRANGE && {
          id: Date.now(),
        }),
      });
      setFormControls(controls);
    },
  });
  drop(ref);

  const handleDeleteControl = (index: number) => {
    const form = formComponents.slice();
    form.splice(index, 1);
    setFormControls(form);
  };

  const handleCopyControl = (index: number) => {
    const form = formComponents.slice();
    const item: IFormControl = form[index];
    form.splice(index + 1, 0, {
      type: item.type,
      ypixel: item.ypixel,
      position: index + 1,
      id: Date.now(),
    });
    setFormControls(form);
  };

  return (
    <StyledControlDropZoneContainer ref={ref}>
      {formComponents.map((formItem: IFormControl, index: number) => {
        return (
          <FormFieldItem
            {...formItem}
            key={formItem.id}
            index={index}
            handleCopyControl={handleCopyControl}
            updateFormControls={updateFormControls}
            handleDeleteControl={handleDeleteControl}
          />
        );
      })}
    </StyledControlDropZoneContainer>
  );
};
