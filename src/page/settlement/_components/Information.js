import React from 'react'
import {Icon,ButtonLink,Text} from '@elevenia/master-ui/components/Atom'
import {TrayFull} from '@elevenia/master-ui/components/Molecules';

const Header = props => {
    return (
        <header className="header u-bg-white u-ps-fixed u-wd-full u-mb-16">
            <div className="container u-ds-flex u-js-between u-al-items-center">
                <div className="u-ds-flex u-al-items-center">
                    <ButtonLink onClick={props.setClose}>
                        <Icon
                            fillColor="black50"
                            name="arrow-left"
                            size={24}
                        />
                    </ButtonLink>
                    <h1 className="u-ml-16">Informasi Penghasilan</h1>
                </div>
            </div>
        </header>
    );
}

const Information = props => {
    return (
        <TrayFull isOpen={props.isOpen}>
            <div className="settlement">
                <Header {...props} />
                <div className="top-fixed u-mb-16">
                    <h2 className="container u-tx-dark u-pb-8">Hasil Penjualan</h2>
                    <div className="u-bg-white u-py-16 u-mb-16">
                        <div className="container">
                            <Text>
                                Hasil Penjualan adalah dana yang akan dicairkan besok berdasarkan status penjualan saat ini. Mungkin ada perbedaan dengan jumlah transfer sebenarnya karena adanya penundaan pencairan dana atau alasan lain.
                            </Text>
                            <br />
                            <Text>
                                Proses pencairan dana ke rekening Seller dilakukan 2 hari kerja setelah tanggal konfirmasi pembelian.
                            </Text>
                            <br />
                            <Text>
                                Dana dalam proses transfer tidak akan muncul jika besok adalah hari Sabtu/Minggu/Libur Nasional karena bank tutup sehingga proses pencairan dana tidak dapat dilakukan.
                            </Text>
                        </div>
                    </div>
                    <h2 className="container u-tx-dark u-pb-8">Petunjuk Standar Settlement & Transfer</h2>
                    <div className="u-bg-white u-py-16 u-mb-16">
                        <div className="container">
                            <Text>
                                Informasi tanggal pengiriman uang berdasarkan tiap tanggal konfirmasi pembelian.
                            </Text>
                            <br />
                            <Text>
                                Jumlah ialah berdasarkan status penjualan saat ini. Mungkin akan ada perbedaan jumlah transfer yang sebenarnya dikarenakan adanya penundaan Settlement/ Transfer atau alasan lain.
                            </Text>
                            <br />
                            <Text>
                                Setiap hari, settlement akan diproses dan ditransfer akan selesai dalam +2 hari kerja dari tanggal konfirmasi pembelian.
                            </Text>
                            <br />
                            <Text>
                                Jumlah transfer yang akan diproses besok tidak akan muncul di hari sebelum Sabtu/Minggu/Hari Libur Nasional karena bank tutup pada Sabtu/Minggu/Hari Libur Nasional dan transfer tidak bisa dilakukan.
                            </Text>
                        </div>
                    </div>
                </div>
            </div>
        </TrayFull>
    )
}

export default Information
