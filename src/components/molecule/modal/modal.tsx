import { Fragment, ReactNode, ChangeEvent } from 'react';
import {
  ModalBlock,
  ModalBody,
  ModalClose,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
} from './style';

export interface IModalState {
  [key: string]: string;
}

export interface IModal {
  title: string;
  footer: ReactNode;
  active: boolean;
  children?: ReactNode;
  hideModal: () => void;
  handleSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
}

export const Modal: React.FunctionComponent<IModal> = ({
  title,
  footer,
  children,
  active,
  hideModal,
  handleSubmit,
}) => {
  return (
    <Fragment>
      {active ? (
        <ModalBlock>
          <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
          <ModalContainer>
            <form onSubmit={handleSubmit}>
              <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
                <ModalClose onClick={() => hideModal()}>X</ModalClose>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>{footer}</ModalFooter>
            </form>
          </ModalContainer>
        </ModalBlock>
      ): null}
    </Fragment>
  );
};
