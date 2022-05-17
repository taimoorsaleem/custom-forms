import { FC } from 'react';
import styled from 'styled-components';
import { BiRefresh } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom';

import { StyledSideBarContent } from '../atom';
import { FormControlList } from '../molecule/formControlList';
import { FormControls } from '../../utils/constants';
import { getMemomizedForm,  IFormState, saveForm } from './ducks/formSlice';


const StyledButton = styled(Link)`
  background: white;
  text-decoration: none;
  color: #0d78fa;
  display: block;
  width: calc(100% - 16px);
  border-radius: 16px;
  padding: 4px 8px;
  span {
    vertical-align: middle;
    margin-left: 8px;
  }
`;

const StyledValidateIcon = styled(BiRefresh)`
  width: auto;
  height: 24px;
  vertical-align: middle;
`;

const StyledFormsTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    font-size: 20px;
    font-weight: bold;
    vertical-align: middle;
  }
`;

const StyledFormListContainer = styled.div`
  div {
    padding: 12px 0 0px 24px;
    cursor: pointer;
  }
`;

export interface Iform {
  type: string;
  value: string;
}


const StyledFormsContainer = styled.div`
  width: calc(100% - 40px);
  padding: 20px;
  background: #f6f6f6;
  color: black;
  max-height: 90px;
  overflow-y: auto;
`;

export const SidebarContainer: FC<{}> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  /** Store selector */
  const forms: Array<IFormState> = useSelector(getMemomizedForm);

  const handleSelectForm = (form: IFormState) => {
    navigate(`/edit/${form.id}`);
  };

  const handleCreateForm = () => {
    dispatch(saveForm({}));
  };

  return (
    <>
      <StyledSideBarContent>
        {forms.length ? (
          <StyledFormsContainer>
            <StyledFormsTitleContainer>
              <div>Forms</div>
              <AiOutlinePlus
                style={{ cursor: 'pointer' }}
                onClick={handleCreateForm}
              />
            </StyledFormsTitleContainer>
            <StyledFormListContainer>
              {forms.map((form: IFormState) => (
                <div
                  key={form.id}
                  style={{
                    background: id === `${form.id}` ? '#ffff' : 'none',
                  }}
                  onClick={() => handleSelectForm(form)}
                >
                  {form.name}
                </div>
              ))}
            </StyledFormListContainer>
          </StyledFormsContainer>
        ) : null}
        <div>
          <StyledButton to="/validate">
            <StyledValidateIcon />
            <span>Validate</span>
          </StyledButton>
        </div>
        <div>
          <div style={{ paddingBottom: '15px' }}>Form Components</div>
          <FormControlList items={FormControls} />
        </div>
      </StyledSideBarContent>
    </>
  );
};
