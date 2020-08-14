import React from 'react'
import { Ribbon } from '@elevenia/master-ui/components/Atom'

const InitialStateAlerts = {
    alert: {
        status: false,
        componentMessage: '',
        statName: '',
    },
}

export const setAlerts = (state = InitialStateAlerts, action) => {
    switch (action.type) {
        case 'ALERT_ERROR':
            return {
                ...state,
                alert: {
                    status: true,
                    componentMessage: (
                        <Ribbon
                            type="error"
                            className="u-ps-fixed"
                            style={{ zIndex: 1030, width: '100%' }}
                        >
                            {action.payload.message}
                        </Ribbon>
                    ),
                    statName: 'error',
                },
            }
        case 'ALERT_SUCCESS':
            return {
                ...state,
                alert: {
                    status: true,
                    componentMessage: (
                        <Ribbon
                            type="success"
                            className="u-ps-fixed"
                            style={{ zIndex: 1030, width: '100%' }}
                        >
                            {action.payload.message}
                        </Ribbon>
                    ),
                    statName: 'success',
                },
            }
        case 'ALERT_WARNING':
            return {
                ...state,
                alert: {
                    status: true,
                    componentMessage: (
                        <Ribbon
                            type="warning"
                            className="u-ps-fixed"
                            style={{ zIndex: 1030, width: '100%' }}
                        >
                            {action.payload.message}
                        </Ribbon>
                    ),
                    statName: 'warning',
                },
            }
        case 'ALERT_ERROR_SESSION':
            console.log('SESSION : ', action.payload.message)
            return {
                ...state,
                alert: {
                    status: true,
                    componentMessage: (
                        <Ribbon
                            type="error"
                            className="u-ps-fixed"
                            style={{ zIndex: 1030, width: '100%' }}
                        >
                            {action.payload.message}
                        </Ribbon>
                    ),
                    statName: 'error-session',
                },
            }
        case 'ALERT_CLEARS':
            return {
                alert: {
                    status: false,
                    componentMessage: '',
                    statName: 'get-all-clear',
                },
            }
        default:
            return state
    }
}
