import React,{useState,useRef,useEffect,useCallback} from "react";
import {
  Icon,
  ButtonLink,
  Textfield,
  Text,
  Segment
} from "@elevenia/master-ui/components/Atom";
import {Subject} from 'rxjs'
import {debounceTime} from 'rxjs/operators'
import {
  Header,
  HeaderBody,
  HeaderRight,
} from "@elevenia/master-ui/components/Organisms/Mobile";

const onSearch$ = new Subject();

const HeaderBlock = ({requestSearch,...props}) => {
  const {RequestProductSearch,active} = props;
  const textInputRef = useRef();
  const [toggle,setToggle] = useState(false);
  const [searchKeyword,setSearchKeyword] = useState("");
  const [finishkeytext,isfinishkeytext] = useState(null);

  const handleInput = useCallback((e) => {
    const {value} = e.target;
    setSearchKeyword(value);
    onSearch$.next(value);
    onSearch$.pipe(debounceTime(500)).subscribe(value => isfinishkeytext(value))
  },[]);

  const focusTextInput = () => {
    setTimeout(() => {
      textInputRef && textInputRef.current.focus();
    },100);
  };

  useEffect(() => {
    finishkeytext === null && RequestProductSearch(finishkeytext,active)
    finishkeytext !== null && RequestProductSearch(finishkeytext,active);
  },[finishkeytext,RequestProductSearch,active])

  return (
    <Segment className="page-order" bg="white" height={60}>
      <Header className={`collapse-header toLeft${toggle ? " hide" : ""}`}>
        <HeaderBody>Daftar Produk</HeaderBody>
        <HeaderRight>
          <ButtonLink
            onClick={() => {
              setToggle(true);
              focusTextInput();
            }}
          >
            <Icon fillColor="black50" name="search" size={24} />
          </ButtonLink>
        </HeaderRight>
      </Header>
      <Header className={`collapse-header toRight${!toggle ? " hide" : ""}`}>
        <HeaderBody>
          <Textfield
            inputProps={{
              onChange: handleInput,
              onKeyUp: handleInput,
              value: searchKeyword,
              ref: textInputRef
            }}
            left={<Icon name={"search"} size={24} fillColor="black50" />}
          />
        </HeaderBody>
        <HeaderRight>
          <ButtonLink
            onClick={() => {
              setSearchKeyword("");
              setToggle(false);
              isfinishkeytext(null);
            }}
          >
            <Text color={"black50"}>Cancel</Text>
          </ButtonLink>
        </HeaderRight>
      </Header>
    </Segment>
  );
};

export default HeaderBlock;
