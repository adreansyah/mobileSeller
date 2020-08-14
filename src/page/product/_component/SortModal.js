import React,{useState,useEffect} from 'react'
import {
  TrayFull,
  SelectList
} from '@elevenia/master-ui/components/Molecules'
import {
  ButtonLink,
  Icon,
  Button,
  Segment
} from '@elevenia/master-ui/components/Atom'
import {Header,HeaderLeft,HeaderBody,Footer} from '@elevenia/master-ui/components/Organisms/Mobile';

const sorting = [
  {
    name: 'Terbaru',
    value: 'createdDate,desc',
  },
  {
    name: 'Nama Produk',
    value: 'productName,asc',
  },
  {
    name: 'Pembelian Terbanyak',
    value: 'totalSales,desc',
  }
]
const SortModal = ({isOpen,onClose,...props}) => {
  const {setSelectedAll,RequestContentProductAfterSort} = props
  const [active,setActive] = useState("");
  const isSort = props.product[props.active].sort;

  useEffect(() => {
    setActive(isSort);
  },[isSort])

  const handleApply = () => {
    onClose();
    props.active !== "evaluated" && props.active !== "periodover" && props.active !== "soldout" && setSelectedAll([]);
    RequestContentProductAfterSort(active,props.active);
  }

  const resetClose = () => {
    console.log(isSort);
    setActive(isSort === "createdDate,desc" ? "createdDate,desc" : isSort);
    onClose()
  }

  return (
    <>
      <TrayFull isOpen={isOpen} overlayClick={() => onClose()}>
        <Header border>
          <HeaderLeft>
            <ButtonLink onClick={() => resetClose()}>
              <Icon name="cancel" size="24" fillColor="black50" />
            </ButtonLink>
          </HeaderLeft>
          <HeaderBody>Urutkan</HeaderBody>
        </Header>
        <Segment>
          <SelectList active={active} onChange={active => setActive(active)}>
            {
              sorting.map(item => {
                return (
                  <div key={item.value}>{item.name}</div>
                )
              })
            }
          </SelectList>
        </Segment>
        <Footer fixed>
          <Button
            variant={'primary-alt'}
            style={{width: '100%'}}
            onClick={() => handleApply()}
          >
            TERAPKAN
          </Button>
        </Footer>
      </TrayFull>
    </>
  )
}

export default SortModal
