const Config = {
    keys: [
        { id: '7', value: 7 },
        { id: '8', value: 8 },
        { id: '9', value: 9 },
        { id: '4', value: 4 },
        { id: '5', value: 5 },
        { id: '6', value: 6 },
        { id: '1', value: 1 },
        { id: '2', value: 2 },
        { id: '3', value: 3 },
        { id: '*', value: '*' },
        { id: '', value: 0 },
        { id: 'L', value: 'L' }
    ],
    keyCodes: {
        1: {value: 1, position: 6},
        2: {value: 2, position: 7},
        3: {value: 3, position: 8},
        4: {value: 4, position: 3},
        5: {value: 5, position: 4},
        6: {value: 6, position: 5},
        7: {value: 7, position: 0},
        8: {value: 8, position: 1},
        9: {value: 9, position: 2},
        '*': {value: '*', position: 9},
        0: {value: 0, position: 10},
        'l': {value: 'L', position: 11}
    },
    serialNumber: '4815162342',
    screenStatus: {
        BLANK: '',
        ERROR: 'Error',
        READY: 'Ready',
        LOCK: 'Locking...',
        UNLOCK: 'Unlocking...',
        SERVICE: 'Service',
        VALIDATE: 'Validating...',
        SET_PASSWORD: 'Enter new password',
        SET_PASSWORD_SUCCESS: 'Setting new password...',
        SET_PASSWORD_FAIL: 'Password changing error'
    },
    screenLocked: {
        LOCK: 'Locked',
        UNLOCK: 'Unlocked'
    },
    serviceUrl: 'https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a?code=',
    setPasswordCode: '******',
    serviceCode: '000000'
}

export default Config;