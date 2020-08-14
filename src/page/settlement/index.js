import React,{useState,useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Tabs} from '@elevenia/master-ui/components/Molecules';
import Balance from './Balance';
import Revenue from './Revenue';
import ActionCreators from 'store/actions/settlement';
import Headers from './_components/Header';
import {trackScreenView} from 'helper/Tracker'
import Segment from '@elevenia/master-ui/components/Atom/Segment';

const Settlement = props => {
    const tabs = [
        {
            key: 'penghasilan',
            name: 'Penghasilan'
        },
        {
            key: 'saldo',
            name: 'Saldo'
        },
    ]
    const [activeTab,setActiveTab] = useState(tabs[0].key);
    const getContent = activeTab => {
        switch(activeTab) {
            case 'penghasilan':
                return <Revenue {...props} />
            case 'saldo':
                return <Balance {...props} />
            default:
                return
        }
    }

    useEffect(() => {
        trackScreenView('Settlement','settlement-id')
    },[]);

    return (
        <Segment>
            <Headers {...props}/>
            <React.Fragment>
                <Segment className="u-mt-24">
                    <Tabs active={activeTab} onChange={activeTab => setActiveTab(activeTab)}>
                        {tabs.map(list => (
                            <Segment key={list.key}>
                                {list.name}
                            </Segment>
                        ))}
                    </Tabs>
                </Segment>
                <Segment>
                    {getContent(activeTab)}
                </Segment>
            </React.Fragment>
        </Segment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators,dispatch);
}

export default connect(null,mapDispatchToProps)(Settlement);
