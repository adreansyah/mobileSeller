import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
//** component
import {
  FormControl,
  Textfield,
  Icon,
  Button
} from "@elevenia/master-ui/components/Atom";
import { Link } from 'react-router-dom';
import { trackScreenView } from 'helper/Tracker'

const ForgotPassword = props => {

  useEffect(() => {
    trackScreenView('Forgot Password', 'forgot-password-id')
  }, [])

  return (
    <div className="u-ps-relative height--100 u-bg-white">
      <header className="header u-ds-block u-bd-bottom u-bd-light">
        <div className="container">
          <div className="row u-al-items-center">
            <button>
              <Link to="/login">
                <Icon 
                name="arrow-left"
                fillColor="black50" 
                size="24"
                />
              </Link>
            </button>
            <h1 className="u-ml-16">Lupa Kata Sandi</h1>
          </div>
        </div>
      </header>
      <section>
        <div className="container">
            <h2 className="u-mt-56 u-mb-8">Silahkan masukkan alamat email yang anda daftarkan</h2>
            <FormControl>
              <Textfield
                model="line"
                inputProps={{
                  onChange: e => e.target,
                  placeholder: 'Masukan Email',
                  name: "username",
                  className: "validate[required,email]"
                }}
                state="normal"
              />
              </FormControl>
        </div>
        <div className="u-bd-top u-bd-light u-p-16 u-ps-absolute u-wd-full" style={{bottom: '0px'}}>
          <FormControl>
            <Button 
              size="medium"
              variant="primary-alt"
              className="u-wd-full"
              onClick={() => alert('kirim')}
            >
              KIRIM
            </Button>
          </FormControl>
        </div>
      </section>

    </div>
  );
};

const mapStateToProps = state => {
  /*
    return{
        ...state
    }
  */
}

const mapDispatchToProps = (dispatch) => {
  /*
  return bindActionCreators();
  */
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
