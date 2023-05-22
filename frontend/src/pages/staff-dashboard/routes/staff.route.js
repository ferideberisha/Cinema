import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { Badge } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useAuthContext } from "../../../hooks/useAuthContext";
import api from "../../../api/axios";
import { useState, useEffect } from "react";

export default function MenuItems({ handleRouteChange }) {
  const { user } = useAuthContext();

  const [messagesNum, setMessagesNum] = useState();

  const getNumberMessages = async () => {
    try {
      await api.get(`api/staff/contactus/nom`).then((number) => {
        setMessagesNum(number.data);
      });
    } catch (err) {
      console.log(`Error : ${err.message}`);
    }
  };
  useEffect(() => {
    getNumberMessages().catch(console.error);
  }, []);

  const handleNumMsgChange = () => {
    handleRouteChange("/messages");
    setMessagesNum(0);
  };

  return (
    <div>
      <ListItem button onClick={() => handleRouteChange("")}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>

      {user.isAdmin && (
        <ListItem button onClick={() => handleRouteChange("/add-movie")}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add Movie" />
        </ListItem>
      )}

      {user.isAdmin && (
        <ListItem button onClick={() => handleRouteChange("/add-show")}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Add Show" />
        </ListItem>
      )}

      {user.isAdmin && (
        <ListItem button onClick={() => handleRouteChange("/view-users")}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="View Users" />
        </ListItem>
      )}

      {user.isAdmin && (
        <ListItem button onClick={() => handleRouteChange("/manage-theaters")}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Theaters" />
        </ListItem>
      )}
      {user.isAdmin && (
        <ListItem button onClick={() => handleNumMsgChange()}>
          <ListItemIcon>
            <Badge badgeContent={messagesNum} color="primary">
              <MailOutlineIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
      )}
    </div>
  );
}
