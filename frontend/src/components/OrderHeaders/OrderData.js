import React from 'react';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';


export const  OrderData =  [ 
    {
        title: "Home",
        icon:<HomeIcon/>,
        link:"/supplier/supplierprofile"

    },
    {
        title: "Order Requests",
        icon:<EmojiPeopleIcon/>,
        link:"/Order/orderreq"

    },
    {
        title: "Accepted Orders",
        icon:<InsertChartIcon/>,
        link:"/Order/acceptedorders"

    },
    {
        title: "Declined Orders",
        icon:<InsertChartIcon/>,
        link:"/Order/declinedorders"

    },
    {
        title: "Raw Material Requests",
        icon:<AddIcon/>,
        link:"/Order/R"
        

    },
    {
        title: "Requested Materials",
        icon:<InsertChartIcon/>,
        link:"/Order/viewreq"
        

    },


];


  