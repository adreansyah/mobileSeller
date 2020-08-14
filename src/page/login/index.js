import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { trackScreenView } from 'helper/Tracker'
import {
    FormControl,
    Textfield,
    Icon,
    Button,
    ButtonGroup,
    ButtonLink,
    Text,
    Segment,
    Spinner
} from '@elevenia/master-ui/components/Atom'
import { Link } from 'react-router-dom'
import ActionCreators from 'store/actions/authentication'
import elvLogo from 'assets/images/elevenia-seller.png'
import { validateInput, validateForm } from 'helper'
const Login = ({ Authentication, setAlerts, authentication }) => {
    const [showPass, setShowPass] = useState(false)
    // const [disabledBtnLogin, setDisabledBtnLogin] = useState(true)
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })

    useEffect(() => {
        trackScreenView('Login', 'login-id')
    }, [])

    const handleFormChange = e => {
        const { name, value } = e.target
        setLoginForm(loginForm => ({
            ...loginForm,
            [name]: value,
        }))
        validateInput('login-form', name)
        // setDisabledBtnLogin(!validateForm("login-form", false, false));
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (validateForm('login-form', true, false)) {
            const { username, password } = loginForm
            Authentication({
                username,
                password,
                clientId: 'fcmToken',
                rememberMe: true,
            })
        }
    }

    return (
        <div className="height--100 u-bg-white">
            {setAlerts.alert.componentMessage}
            <div className="container">
                <Segment pt={80}>
                    <div className="logo u-mb-40 u-mx-auto">
                        <img className="u-wd-full" src={elvLogo} alt="" />
                    </div>
                    <Segment mb={24}>
                        <Text H14 className="txt-title">
                            MASUK
                        </Text>
                    </Segment>
                    <Segment>
                        <form id="login-form" onSubmit={e => handleSubmit(e)}>
                            <Segment mb={24}>
                                <FormControl label="Email" model="static">
                                    <Textfield
                                        model="line"
                                        inputProps={{
                                            onChange: e => handleFormChange(e),
                                            placeholder: 'Masukan Email',
                                            name: 'username',
                                            className: 'validate[required,email]',
                                        }}
                                        state="normal"
                                    />
                                </FormControl>
                                <FormControl
                                    label="Kata Sandi"
                                    model="static"
                                    className={'u-mt-16'}
                                >
                                    <Textfield
                                        model="line"
                                        inputProps={{
                                            onChange: e => handleFormChange(e),
                                            placeholder: 'Masukan Kata Sandi',
                                            type: showPass ? 'text' : 'password',
                                            name: 'password',
                                            className: 'validate[required]',
                                        }}
                                        right={
                                            <ButtonLink
                                                type="button"
                                                styles={`btn u-p-0`}
                                                onClick={() => setShowPass(!showPass)}
                                            >
                                                <Icon
                                                    className="check"
                                                    name={showPass ? 'visible' : 'invisible'}
                                                    size={24}
                                                    fillColor="#70727D"
                                                />
                                            </ButtonLink>
                                        }
                                        state="normal"
                                    />
                                </FormControl>
                                <Text B12 textAlign="right" mt={8}>
                                    <Link to="/forgot-password">Lupa kata sandi ?</Link>
                                </Text>
                            </Segment>
                            <Segment>
                                <ButtonGroup responsive>
                                    {authentication.loading ? (
                                        <Button type="button" variant="primary-alt">
                                            <Spinner color="#FFF" />
                                        </Button>
                                    ) : (
                                        <Button variant="primary-alt">MASUK</Button>
                                    )}
                                </ButtonGroup>
                                <Text B12 textAlign="center" className="u-mt-16">
                                    Tidak punya akun seller? <Link to="#">Daftar Sekarang</Link>
                                </Text>
                            </Segment>
                        </form>
                    </Segment>
                </Segment>
            </div>
        </div>
    )
}

Login.propTypes = {
    Authentication: PropTypes.func.isRequired,
}

const mapStateToProps = ({ authentication, setAlerts }) => ({
    authentication,
    setAlerts,
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
