import { createAsyncThunk, createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { getForms, validateData } from '../../../service';
import { statusType } from '../../../utils/constants';
import { RootState } from '../../../store';

/** State interface */
interface IUpInsertForm {
  id?: number,
}
interface ISelectForm {
  id: number,
}
export interface IFormControl {
  id: number,
  type: string,
  position?: number,
  ypixel: number,
}
export interface IFormState {
  id?: number,
  name?: string,
  controls: Array<IFormControl>
}
export interface IFormInitialState {
  forms: Array<IFormState>,
  active_form: IFormState,
  status: string,
}
  
const initialState: IFormInitialState = {
  forms: [],
  active_form: {
    controls: [],
  } as IFormState,
  status: '',
};

/** Async Actions */
export const fetchForms = createAsyncThunk(
  'form/setForms',
  async () => {
    const response = await getForms();
    return response;
  }
);

export const validateFormData = createAsyncThunk(
  'form/validateFormData',
  async (_, thunkAPI) => {
    const response = await validateData();
    thunkAPI.dispatch(updateStatus(statusType.SUCCESS));
    return response;
  }
);

/** Form Slice */
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    /** Set API fetch forms to state */
    setForms: (state: IFormInitialState, action: PayloadAction<Array<IFormState>>) => {
        state.forms = action.payload;
    },
    /** Create new Form */
    // createForm: (state: any, action: PayloadAction<any>) => {
    //     state.forms = action.payload;
    // },
    /** Create new Form or update exiting form */
    saveForm: (state: IFormInitialState, action: PayloadAction<IUpInsertForm>) => {
      // Create new form if id does not provided
      if (!action.payload.id) {
         const id = Date.now();
          const name = `Form${state.forms.length + 1}`;
        state.forms.push({
          ...state.active_form,
          id,
          name,
        });
      } else {
        // Update form controls
        let activeForm: IFormState | undefined = state.forms
          .find((form: IFormState) => form.id === action.payload.id);
        if (activeForm) activeForm.controls = state.active_form?.controls; 
      }
      state.active_form = {
        controls: [], 
      }
    },
    /** Select form to perform operation */
    selectForm: (state: IFormInitialState, action: PayloadAction<ISelectForm>) => {
        const activeForm: IFormState | undefined = state.forms
          .find((form: IFormState) => form.id === action.payload.id);
        if (activeForm) 
          state.active_form = activeForm;
        else
          state.status = statusType.INVALID_URL
    },
    /** Update form controls */
    updateControl: (state: IFormInitialState, action: PayloadAction<Array<IFormControl>>) => {
      state.active_form = {
        ...state.active_form,
        controls: action.payload,
      }
    },
    /** Update status of submit preview form */
    updateStatus: (state: IFormInitialState, action: PayloadAction<string>) => {
      state.status = action.payload;
    }
  },
  /** Async Actions */
  extraReducers: (builder) => {
    builder
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.forms = action.payload;
      })
      .addCase(validateFormData.fulfilled, (state, action) => {
        /**  Perform action on success */
      })
  },
});

export const { saveForm, setForms, selectForm, updateControl, updateStatus } = formSlice.actions;

/** Memoized selector */
export const getMemomizedForm = createSelector(
  (state: RootState) => state.form,
  (form: IFormInitialState) => form.forms || [],
);
export const getMemomizedActiveForm = createSelector(
  (state: RootState) => state.form,
  (form: IFormInitialState) => form.active_form,
);
export const getMemomizedActiveFormContorls = createSelector(
  (state: RootState) => state.form,
  (form: IFormInitialState) => form.active_form.controls || [],
);
export const getMemomizedStatus = createSelector(
  (state: RootState) => state.form,
  (form: IFormInitialState) => form.status || '',
);
