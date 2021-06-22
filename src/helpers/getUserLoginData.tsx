export const getUserLoginData = () => {
    const login = 'lei-lmk'
    const password = 'AAABBB'
    const type = localStorage.getItem('schedulerUserType');

    // const login = ' ';
    // const password = ' ';
return {login, password, type};

};