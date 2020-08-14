import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { DynamicRoute } from 'helper'
import Routes from 'config/Route'
import MenuBar from 'component/MenuBar'
import { getProfile } from 'store/actions/profile'

const Layout = ({ profile, getProfile }) => {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (!profile.data.id && !loaded) {
            setLoaded(true)
            getProfile()
        }
    }, [loaded, profile, getProfile])
    return (
        <>
            <Switch>
                {Routes.private.map((route, idx) => {
                    return route.component ? (
                        <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => {
                                return <route.component {...props} title={route.name} />
                            }}
                        />
                    ) : null
                })}
                <Route render={props => <DynamicRoute {...props} />} />
            </Switch>
            <MenuBar />
        </>
    )
}
const mapStateToProps = ({ profile }) => ({ profile })

const mapDispatchToProps = { getProfile }

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
