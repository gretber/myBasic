// Instruments
import * as types from './types';

export const setBriksAction: types.SetDataContract = (payload) => ({
    type: types.SET_DATA,
    payload,
});

export const setNuBrikAction: types.SetNuBrikContract = (payload) => ({
    type: types.SET_NU_BRIK,
    payload,
});

export const updateSelectionAction: types.UpdateSelectionContract = (payload) => ({
    type: types.UPDATE_SELECTION,
    payload,
});

export const deleteProjectAction: types.DeleteProjectContract = (payload) => ({
    type: types.DELETE_PROJECT,
    payload,
})

export const updateProjectAction: types.UpdateProjectContract = (payload) => ({
    type: types.UPDATE_PROJECT,
    payload,
});

export const setNonScheduledBriksAction: types.setNonScheduledBriksContract = (payload) => ({
    type: types.SET_NON_SCHEDULED_BRIKS,
    payload, 
})

export const scheduleBrik: types.ScheduleProjectContract = (payload) => ({
    type: types.SCHEDULE_PROJECT,
    payload,
})

export const unScheduleBrik: types.UnScheduleProjectContract = (payload) => ({
    type: types.UN_SCHEDULE_PROJECT,
    payload,
})