import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovieIcon from "@mui/icons-material/Movie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

export default function MenuItems({ handleRouteChange }) {
  return (
    <div>
      <ListItem button onClick={() => handleRouteChange("")}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button onClick={() => handleRouteChange("/my-tickets")}>
        <ListItemIcon>
          <MovieIcon />
        </ListItemIcon>
        <ListItemText primary="My Tickets" />
      </ListItem>
      <ListItem button onClick={() => handleRouteChange("/favorite-movies")}>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText primary="Favorite Movies" />
      </ListItem>
      <ListItem button onClick={() => handleRouteChange("/watch-list")}>
        <ListItemIcon>
          <PlaylistAddCheckIcon />
        </ListItemIcon>
        <ListItemText primary="Watch List" />
      </ListItem>
    </div>
  );
}
