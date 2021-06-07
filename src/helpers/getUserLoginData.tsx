export const getUserLoginData = () => {
    const login = localStorage.getItem('schedulerUserLogin');
    const password = localStorage.getItem('schedulerUserPassword');
    const type = localStorage.getItem('schedulerUserType');

return {login, password, type};

};