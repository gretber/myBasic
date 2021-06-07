
// Types
import { CreateBrikType } from './types';

// API
import { fetchData } from './fetchData';

// Helpers
import { getUserLoginData } from '../../../helpers/getUserLoginData';

export const copyBrik: CreateBrikType = async (newBrik) => {

  // Clean request data
  const bodyNewBrik = { ...newBrik }
    
  const body = {
    root: {
      projects: {
        project: [
          bodyNewBrik
        ]
      }
    }
  };
  
const createBrikUrl = process.env.REACT_APP_CREATE_PROJECT;
const {login, password} = getUserLoginData();

  try {
     const encoded = window.btoa(`${login}:${password}`);

    const response = await fetch(`${createBrikUrl}`, {
          method:  'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${encoded}`,
          },
          body: JSON.stringify(body),
      });

      if (response.status !== 200) {
        throw new Error('Todo create failed');
      }
      const data = await response.json();

      fetchData()

  } catch (error) {
      console.log(error);
  } finally {
  }
};