import React from 'react';
import LocalShippingSharpIcon from '@material-ui/icons/LocalShippingSharp';
import MoveToInboxSharpIcon from '@material-ui/icons/MoveToInboxSharp';
import BackupSharpIcon from '@material-ui/icons/BackupSharp';
import ReplayIcon from'@material-ui/icons/Replay';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import HomeIcon from '@material-ui/icons/Home';

export const  OutboundSidebarData =  [
    {
        // link represents where it should redirect to
        title: "Home ",
        icon:<HomeIcon/>,
        link:"/supplier/supplierprofile",
    },
    {
        // link represents where it should redirect to
        title: "Order Details ",
        icon:<MoveToInboxSharpIcon/>,
        link:"/AllOrders",
    },
    
    {
        title: "Inventory Update",
        icon:<BackupSharpIcon/>,
        link:"/InventoryRequest"

    },
    {
        title: "Tracking Orders",
        icon:<LocalShippingSharpIcon/>,
        link:"/Tracking"

    },
    {
        title: "Return Items",
        icon:<ReplayIcon/>,
        link:"/ReturnItems"

    },
    {
        title: "Tracking Return Packages",
        icon:<FlightTakeoffIcon/>,
        link:"/Return"

    }
    
];


  