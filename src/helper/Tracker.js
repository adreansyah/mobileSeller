import { emitter, tracker } from 'snowplow-tracker'
import store from 'store'
import {
    enableTracker,
    platform,
    nameSpace,
    appId,
    encodeBase64,
    endPoint,
    protocolMethod,
    port,
    requestMethod
} from 'config/TrackerConfig'

const emitterConf = emitter(
    endPoint, // Collector endpoint
    protocolMethod, // Optionally specify a method - http is the default
    port, // Optionally specify a port
    requestMethod, // Method - defaults to GET
    null, // Only send events once n are buffered. Defaults to 1 for GET requests and 10 for POST requests.
    function (error, body, response) {
        if (error) {
            console.log("Request to Scala Stream Collector failed!");
        } else {
            console.log('OK:', response)
        }
    },
    { maxSockets: 6 } // Node.js agentOptions object to tune performance
)
const spTracker = tracker([emitterConf], nameSpace, appId, encodeBase64)
spTracker.setPlatform(platform)

export const trackScreenView = (name, id, context = null) => {
    const userId = store.getState().profile.data.id
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    // console.log('trackScreenView', name, id, userId, screenWidth, screenHeight)

    spTracker.setUserId(userId)
    spTracker.setScreenResolution(screenWidth, screenHeight)
    if (enableTracker) spTracker.trackScreenView(name, id, context, (new Date()).getTime())
}

export const trackPageView = (pageUrl = window.location.pathname, pageTitle = document.title, referrer = null, context = null) => {
    const userId = store.getState().profile.data.id
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    // console.log('trackPageView', pageUrl, pageTitle, userId, screenWidth, screenHeight)

    spTracker.setUserId(userId)
    spTracker.setScreenResolution(screenWidth, screenHeight)
    if (enableTracker) spTracker.trackPageView(pageUrl, pageTitle, referrer, context, (new Date()).getTime())
}

export const trackStructEvent = (category, action, label = null, property = null, value = null, context = null) => {
    const userId = store.getState().profile.data.id
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight

    // console.log('trackStructEvent', category, action, userId, screenWidth, screenHeight)

    spTracker.setUserId(userId)
    spTracker.setScreenResolution(screenWidth, screenHeight)
    if (enableTracker) spTracker.trackStructEvent(category, action, label, property, value, context, (new Date()).getTime())
}