// Types
import { Project } from '../../bus/briks/dataTypes';

// Store
import { store } from '../../@init';

// Actions
import { togglerCreatorAction } from '../../bus/client';
import {updateProjectAction} from '../../bus/briks/actions';

// API
import { fetchData } from '../../bus/briks/api/fetchData'

// Moment
import moment from 'moment';

// Helpers
import { subDays } from '../../helpers/subDays';

export const dropProject = async (data: any) => {

  const body = {
    id:                 data.id,
    regionId:           data.regionId,
    leaderId:           data.leaderId,
    projectNo:          data.projectNo,
    factoryItemName:    data.factoryItemName,
    factoryItemId:      data.factoryItemId,
    customerId:         data.customerId,
    customerName:       data.customerName,
    state:              data.state,
    status:             data.status,
    name:               data.name,
    name2:              data.name2,
    startDate:          moment(data.startDate).format("DD/MM/YYYY"),
    endDate:            moment(subDays(data.endDate, 1)).format("DD/MM/YYYY"),
    duration:           data.duration,
    calculatedDuration: data.calculatedDuration,
    weekendWork:        data.weekendWork,
    jobType:            data.jobType,
    teamId:             data.resourceId,
    factoryId:          data.factoryId,
    tons:               data.tons,
    area:               data.area,
    color:              data.color,
    details:            data.details
  }

  const id = data.id

  const prepareBody = {
    root: {
      projects: {
        project: [
          body
        ]
      }
    }
  }

  const updateProjectURL = process.env.REACT_APP_UPDATE_PROJECT;

  //store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: true }));  
  try {
    const encoded = window.btoa('lei-lmk:AAABBB')

    const response = await fetch(`${updateProjectURL}${id}`, {
    method:  'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encoded}`,
        },

        body: JSON.stringify(prepareBody),
    });

    if (response.status !== 200) {
      throw new Error('Todo create failed');
    }

    store.dispatch(updateProjectAction(body))
    //fetchData()

  } catch (error) {
    console.log(error);
  } finally {
    //store.dispatch(togglerCreatorAction({ type: 'isDataFetching', value: false }));
  }

}