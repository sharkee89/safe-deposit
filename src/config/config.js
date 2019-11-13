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
    serialNumber: '4815162342',
    screenStatus: {
        BLANK: '',
        ERROR: 'Error',
        READY: 'Ready',
        LOCK: 'Locking...',
        UNLOCK: 'Unlocking...',
        SERVICE: 'Service',
        VALIDATE: 'Validating...'
    },
    screenLocked: {
        LOCK: 'Locked',
        UNLOCK: 'Unlocked'
    }
}

export default Config;