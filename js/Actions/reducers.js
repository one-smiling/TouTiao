/**
 * Created by lushuai on 2018/4/28.
 */

export const PLAY_ACTION = 'PLAY_ACTION'
export const PAUSE_ACTION = 'PAUSE_ACTION'
export const VIDEO_URL = 'VIDEO_URL'
export function videoInfo(state = {paused:true},action) {
    const ret = {...state}
    if (action.type === PLAY_ACTION) {
        return {
            ...ret,
            paused:false,
        }
    } else if (action.type === PAUSE_ACTION ) {
        return {
            ...ret,
            paused:true,
        }
    } else if (action.type === VIDEO_URL) {
        return {
            ...ret,
            playingURL:action.url,
        }
    } else  {
        return {...ret}
    }
}


