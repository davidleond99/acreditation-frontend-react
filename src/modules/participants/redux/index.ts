import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import participantService from '../services';
import { IParticipant } from '../types';
import { showMessage } from '../../../shared/redux/message';

interface IParticipantsState {
  initalRows: number;
  loading: boolean;
  creating: boolean;
  deleting: boolean;
  participants: IParticipant[];
}

const initialState: IParticipantsState = {
  initalRows: 10,
  loading: false,
  deleting: false,
  creating: false,
  participants: [],
};

interface IParticipantsFilters {
  offset?: number;
  limit?: number;
  nombre?: string;
}

export const getParticipants = createAsyncThunk(
  'get/participants',
  async (
    input: IParticipantsFilters,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await participantService.filter<IParticipant[]>(input);
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

export const createParticipant = createAsyncThunk(
  'post/participants',
  async (
    input: IParticipant,
    { fulfillWithValue, rejectWithValue, dispatch }
  ) => {
    try {
      const { codigo, ...body } = input;
      const response = await participantService.createItem<IParticipant>(body);
      if (response.status === 201) {
        dispatch(
          showMessage({
            severity: 'success',
            summary: 'Participante creado',
          })
        );
        return fulfillWithValue<IParticipant>(response.data);
      } else {
        dispatch(
          showMessage({
            severity: 'error',
            summary: 'Lo sentimos ha ocurrido un error',
          })
        );
        return rejectWithValue(false);
      }
    } catch (error) {
      dispatch(
        showMessage({
          severity: 'error',
          summary: 'Lo sentimos ha ocurrido un error',
        })
      );
      return rejectWithValue(false);
    }
  }
);

export const editParticipant = createAsyncThunk(
  'put/participants',
  async (
    input: IParticipant,
    { fulfillWithValue, rejectWithValue, dispatch }
  ) => {
    try {
      const { codigo, ...body } = input;
      const response = await participantService.updateItem<
        IParticipant,
        string
      >(codigo?.toString(), body);
      if (response.status === 200) {
        dispatch(
          showMessage({
            severity: 'success',
            summary: 'Participante actualizado',
          })
        );
        return fulfillWithValue<IParticipant>(response.data);
      } else {
        dispatch(
          showMessage({
            severity: 'error',
            summary: 'Lo sentimos ha ocurrido un error',
          })
        );
        return rejectWithValue(false);
      }
    } catch (error) {
      dispatch(
        showMessage({
          severity: 'error',
          summary: 'Lo sentimos ha ocurrido un error',
        })
      );
      return rejectWithValue(false);
    }
  }
);

export const getParticipantById = createAsyncThunk(
  'get/participant',
  async (codigo: string, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await participantService.getItemById<
        IParticipant,
        string
      >(codigo);
      if (response.status === 200) {
        return fulfillWithValue<IParticipant>(response.data);
      } else {
        dispatch(
          showMessage({
            severity: 'error',
            summary: 'Lo sentimos ha ocurrido un error',
          })
        );
        return rejectWithValue(false);
      }
    } catch (error) {
      dispatch(
        showMessage({
          severity: 'error',
          summary: 'Lo sentimos ha ocurrido un error',
        })
      );
      return rejectWithValue(false);
    }
  }
);

export const deleteParticipant = createAsyncThunk(
  'delete/participant',
  async (codigo: string, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const response = await participantService.delete<string>(codigo);

      if (response.status === 200) {
        dispatch(
          showMessage({
            severity: 'success',
            summary: 'Participante eliminado',
          })
        );
        return fulfillWithValue(codigo);
      } else {
        dispatch(
          showMessage({
            severity: 'error',
            summary: 'Lo sentimos ha ocurrido un error',
          })
        );
        return rejectWithValue(false);
      }
    } catch (error) {
      dispatch(
        showMessage({
          severity: 'error',
          summary: 'Lo sentimos ha ocurrido un error',
        })
      );
      return rejectWithValue(false);
    }
  }
);

const participantsSlice = createSlice({
  name: 'participants',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<number>) => {
      state.initalRows = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getParticipants.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getParticipants.fulfilled, (state, payload) => {
      state.loading = false;
      state.participants = payload.payload;
    });
    builder.addCase(getParticipants.rejected, (state) => {
      state.loading = false;
      state.participants = [];
    });
    builder.addCase(deleteParticipant.pending, (state) => {
      state.deleting = true;
    });
    builder.addCase(deleteParticipant.fulfilled, (state, action) => {
      state.deleting = false;
      state.participants = state.participants.filter(
        (participant) =>
          participant.codigo?.toString() !== action.payload?.toString()
      );
    });
    builder.addCase(deleteParticipant.rejected, (state) => {
      state.deleting = false;
    });
    builder.addCase(getParticipantById.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(getParticipantById.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(getParticipantById.rejected, (state) => {
      state.creating = false;
    });
    builder.addCase(createParticipant.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createParticipant.fulfilled, (state, payload) => {
      state.creating = false;
      state.participants.push(payload.payload);
    });
    builder.addCase(createParticipant.rejected, (state, payload) => {
      state.creating = false;
    });
    builder.addCase(editParticipant.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(editParticipant.rejected, (state) => {
      state.creating = false;
    });
    builder.addCase(editParticipant.fulfilled, (state, payload) => {
      state.creating = false;
      const index = state.participants.findIndex(
        (participant) => participant.codigo === payload.payload.codigo
      );
      if (index !== -1) {
        state.participants[index] = payload.payload;
      }
    });
  },
});

export const participantsReducer = participantsSlice.reducer;
export const { setRows } = participantsSlice.actions;
export const participantsSelector = (state: RootState): IParticipantsState =>
  state.participants;
export default participantsReducer;
