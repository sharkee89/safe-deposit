import Config from '../config/config';

export function isStatusNumber (status) {
    return status === Config.screenStatus.BLANK ||
        status === Config.screenStatus.ERROR ||
        status === Config.screenStatus.LOCK ||
        status === Config.screenStatus.READY ||
        status === Config.screenStatus.SERVICE ||
        status === Config.screenStatus.UNLOCK ||
        status === Config.screenStatus.VALIDATE ||
        status === Config.screenStatus.SET_PASSWORD;
}