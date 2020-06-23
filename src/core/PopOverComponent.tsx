import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";


const styles = {
  root: {
    padding: 2,
    color: (props:any) => props.color,
    
  }
}
const WhiteTextTypography = withStyles(styles)(Typography);
export default function SimplePopover({color}:any) {
  
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      
      <Button size="small" aria-describedby={id}  onClick={handleClick}>
          Learn More
        </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <WhiteTextTypography color={color}> The Following vehicles 
        <br/>
        should be serviced soon.
        <br/>
        since their safe score is below 7.5
        <ul >
          <li> v1</li>
          <li> v2</li>
          <li> v3</li>
        </ul>
        </WhiteTextTypography>
      </Popover>
    </div>
  );
}
