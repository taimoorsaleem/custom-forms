import { FC, useRef, useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';

import {
  ComponentModels,
  IComponentModel,
  dragTypes,
} from '../../utils/constants';
import { FormFieldEditor } from './formFieldEditor';

const StyledFormItemContainer = styled.div`
  position: relative;
  padding: 24px 58px;
`;

type Props = {
  label?: string;
  type: string;
  Component?: FC;
  ComponentModal?: FC;
  index: number;
  position?: number;
  ypixel?: number;
  x?: number;
  updateFormControls: Function;
  handleDeleteControl: Function;
  handleCopyControl: Function;
  metadata?: any;
};

export const FormFieldItem: FC<Props> = (props: Props) => {
  const componentModel: IComponentModel = ComponentModels[props.type];
  const ref = useRef<HTMLDivElement>(null);
  /** Use State */
  const [openModal, setOpenModal] = useState(false);

  /** Use Effect */
  useEffect(() => {
    const boundingClientRect: any = ref.current?.getBoundingClientRect();
    if (
      !props.ypixel ||
      boundingClientRect.y !== props.ypixel ||
      props.position !== props.index
    ) {
      props.updateFormControls(props.index, {
        ypixel: boundingClientRect.y,
        position: props.index,
      });
    }
  }, []);

  const [{ opacity }, drag] = useDrag({
    type: dragTypes.RE_ARRANGE,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    item: {
      index: props.index,
      type: props.type,
      dragType: dragTypes.RE_ARRANGE,
      ...(props.metadata && { metadata: props.metadata }),
    },
  });
  drag(ref);

  return (
    <StyledFormItemContainer ref={ref} style={{ opacity }}>
      <div style={{ marginBottom: 8 }}>{componentModel.label}</div>
      <FormFieldEditor
        index={props.index}
        setOpenModal={setOpenModal}
        handleCopyControl={props.handleCopyControl}
        handleDeleteControl={props.handleDeleteControl}
      />
      {componentModel.ComponentModal ? (
        <componentModel.ComponentModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          handleFormSubmit={(data: any) =>
            props.updateFormControls(props.index, data)
          }
          metadata={props.metadata}
        />
      ) : null}
      <componentModel.Component
        label={props?.metadata?.label}
        name={props?.metadata?.name}
        index={props.index}
        disabled={true}
      />
    </StyledFormItemContainer>
  );
};
