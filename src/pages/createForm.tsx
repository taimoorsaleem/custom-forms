import { FC } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { SidebarContainer } from '../components/container/sidebarContainer';
import { FormFieldContainer } from '../components/container/formFieldContainer';

const StyledCreateFormPage = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const CreateForm: FC<{}> = () => {
  return (
    <StyledCreateFormPage>
      <DndProvider backend={HTML5Backend}>
        <SidebarContainer />
        <FormFieldContainer />
      </DndProvider>
    </StyledCreateFormPage>
  );
};
