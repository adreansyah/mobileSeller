import React, { useState, useEffect } from 'react'
import {ButtonLink, Icon} from '@elevenia/master-ui/components/Atom'
import { Tray, TrayHeader, TrayContent, TrayTitle, SelectList } from '@elevenia/master-ui/components/Molecules'

const PeriodTray = props => {
    const { activePeriod, show, onChange, options, toggle } = props
    const [period, setPeriod] = useState(options)
    useEffect(() => {
        const newPeriod = options.map(list => {
            list.value === activePeriod.value ? (list.checked = true) : (list.checked = false)
            return list
        })
        setPeriod([...newPeriod])
    }, [activePeriod, options])

    const appliedChange = (e) =>{
        onChange(e)
        toggle()
    }

    return (
        <>
        <Tray isOpen={show} overlayClick={toggle}>
            <TrayHeader>
                <TrayTitle>Periode</TrayTitle>
                <ButtonLink onClick={toggle}>
                <Icon name="cancel" size="24" fillColor="black50" />
                </ButtonLink>
            </TrayHeader>
            <TrayContent>
            <SelectList active={activePeriod.value} onChange={(e) => appliedChange(e)} clasName="test">
               {period.map(list => {
                   return(
                    <div key={list.value}>{list.label}</div>
                   )
               })}
            </SelectList>
            </TrayContent>
        </Tray>
        </>
    )
}

export default PeriodTray
