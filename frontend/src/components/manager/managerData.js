import React from 'react';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import ContactMailIcon from '@material-ui/icons/ContactMail';

// import InventorySharpIcon from '@mui/icons-material/InventorySharp';
// import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';

export const  managerData =  [ 
    {
        // link represents where it should redirect to
        title: "My Account",
        icon:<AccountCircleSharpIcon/>,
        link:"/supplier/supplierprofile"

    },
    {
        title: "Inventory Management",
        icon:<InsertChartIcon/>,
        link:"/itwt/wlist"
    },
    {
        title: "Labour Management",
        icon:<EmojiPeopleIcon/>,
        link:"/labour/add"
    },
    {
        title: "Inbound Management",
        icon:<LocalShippingIcon/>,
        link:"/inbound/view"
    },
    {
        title: "Outbound Management",
        icon:<AirplanemodeActiveIcon/>,
        link:"/AllOrders"
    },
    {
        title: "Order Management",
        icon:<ShoppingCartIcon/>,
        link:"Order/orderreq"
    },
    {
        title: "Suppliers Management",
        icon:<SupervisedUserCircleIcon/>,
        link:"/supplier/onlysupplier/supplier"
    },
    {
        title: "Agent Management",
        icon:<ContactMailIcon/>,
        link:"/agent/allagent/agent"
    },
    {
        title: "All Users",
        icon:<SupervisedUserCircleIcon/>,
        link:"/manager/userchart"
    }


    
];


  