import React, { useState, useEffect } from 'react';
import { trackScreenView } from 'helper/Tracker'

/** component */
import Header from './_components/Header';
import {
  ButtonGroup,
  Button,
  Icon,
  Text
} from '@elevenia/master-ui/components/Atom'
import {
  ModalLite,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter
} from '@elevenia/master-ui/components/Molecules'

const HelpCenter = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [textModal, setContentModal] = useState({ title: '', textContent: '' });
  const [actionYes, setActionYes] = useState({ action: null });
  const showModals = (type = '', text = '') => {
    setShowModal(true);
    setContentModal({
      title: type,
      textContent: text
    });
    if (type === 'Call Center') {
      setActionYes({ action: () => makeACall() });
    } else if (type === 'Email') {
      setActionYes({ action: () => sendEmail() });
    } else if (type === 'Twitter') {
      setActionYes({ action: () => sendTweet() });
    }

    //console.log(type,text);
  }

  useEffect(() => {
    trackScreenView('Help Center', 'help-center-id')
  }, [])

  const makeACall = () => {
    window.open('tel:0211500201');
    setShowModal(false);
  }

  const sendEmail = () => {
    window.open('mailto:cs@elevenia.co.id');
    setShowModal(false);
  }

  const sendTweet = () => {
    window.open('https://twitter.com/@eleveniacare');
    setShowModal(true);
  }
  return (
    <div className="helpcenter">
      <Header {...props}/>
      <React.Fragment>
        <div className="u-bg-white u-mt-8">
          <div className="container u-ds-flex u-js-between u-al-items-center line--solid">
            <div className="u-fx-row u-al-items-center u-py-12">
              <Icon
                fillColor="black50"
                name="handphone"
                size={24}
              />
              <p className="u-pl-8">Call Center</p>
            </div>
            <button className="u-tx-secondary-green" onClick={() => showModals('Call Center', 'Apakah Anda ingin menghubungi Customer Service kami?')}>
              021-1500201
            </button>
          </div>
          <div className="container u-ds-flex u-js-between u-al-items-center line--solid">
            <div className="u-fx-row u-al-items-center u-py-12">
              <Icon
                fillColor="black50"
                name="mail"
                size={24}
              />
              <p className="u-pl-8">Email</p>
            </div>
            <button className="u-tx-secondary-green" onClick={() => showModals('Email', 'Apakah Anda ingin mengirimkan email ke Customer Service kami?')}>
              cs@elevenia.co.id
            </button>
          </div>
          <div className="container u-ds-flex u-js-between u-al-items-center">
            <div className="u-fx-row u-al-items-center u-py-12">
              <Icon
                fillColor="black50"
                name="twitter"
                size={24}
                variant={'social-media'}
              />
              <p className="u-pl-8">Twitter</p>
            </div>
            <button className="u-tx-secondary-green" onClick={() => showModals('Twitter', 'Apakah Anda ingin lapor ke Customer Service kami?')}>
              @eleveniacare
            </button>
          </div>
        </div>
        <div className="container u-py-8">
          <p className="u-tx-b2 u-tx-info">Call Center: 24 jam sehari, 7 hari seminggu. <br /> <br />Email & Twitter: Senin sampai Sabtu 09:00 - 18:00 WIB.</p>
        </div>
      </React.Fragment>

      <ModalLite isOpen={showModal} toggle={() => setShowModal(!showModal)} backdrop="static">
        <ModalHeader>
          <ModalTitle className="u-tx-center">{textModal.title}</ModalTitle>
        </ModalHeader>
        <ModalBody className="u-tx-center">
          <Text type="P1" className="u-tx-info">
            {textModal.textContent}
          </Text>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup space={8}>
            <Button size="medium" variant="secondary-alt" onClick={actionYes.action}>YA</Button>
            <Button size="medium" variant="primary-alt" onClick={() => setShowModal(!showModal)}>TIDAK</Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalLite>
    </div>
  )
}

export default HelpCenter