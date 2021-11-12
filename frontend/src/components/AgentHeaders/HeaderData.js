import React from "react";
import MoveToInboxSharpIcon from '@material-ui/icons/MoveToInboxSharp'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

export const HeaderData = [
    {
        //link represent where it should redirect to
        title: "My Account",
        icons:<MoveToInboxSharpIcon/>,
        link:"/agent/agentprofile"

    },
    {

        title: "Add Request",
        icons:<EmojiPeopleIcon/>,
        link:"/agent/add"
    }
];