import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

const styles = {
  root: {
    padding: 30,
    color: (props: any) => props.color,

  }
}
const WhiteTextTypography = withStyles(styles)(Typography);
export default function SimplePopover({ color, vehicles, title }: any) {

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

      <Button size="small" aria-describedby={id} onClick={handleClick}>
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
        <WhiteTextTypography color={color}> The Following vehicles has
        <br />
          {title.split(';').map(
            (line: string) => <span>{line}<br /></span>

          )}

          <Divider />
          <br />
          {vehicles.length > 0 ?
            <ul>
              {vehicles.map((vehicle: string) =>
                (
                  <li>{vehicle}</li>
                ))}
            </ul> : "No vehicle is found in this category"
          }


        </WhiteTextTypography>
      </Popover>
    </div>
  );
}
