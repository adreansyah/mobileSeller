import React from "react";
import {Icon} from "@elevenia/master-ui/components/Atom";
import {Link,withRouter} from "react-router-dom";
import "./scss/menubar.scss";

const MenuBar = props => {
  const {pathname} = props.location;
  const menus = [
    {
      name: "beranda",
      icon: "home",
      path: "/"
    },
    {
      name: "penjualan",
      icon: "sales",
      path: "/sales"
    },
    {
      name: "produk",
      icon: "product",
      path: "/product/" + pathname.split('/')[2]
    },
    {
      name: "toko saya",
      icon: "my-store",
      path: "/my-store"
    }
  ];

  const pageActive = (list) => {
    return pathname === list ? true : false
  }

  const found = menus.find(key => key.path === pathname);

  if(found) {
    return (
      <>
        <div className="menubar-wrapper u-bg-white">
          <div className="container">
            {menus.map((list,index) => (
              <div className="menubar-list" key={index}>
                <Link to={list.path}>
                  <Icon
                    name={list.icon}
                    size={24}
                    fillColor={"black50"}
                    variant="special"
                    active={pageActive(list.path)}
                  />
                  <div className={`menubar-name ${pageActive(list.path) ? 'active' : ''}`}>{list.name}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default withRouter(MenuBar);
