import * as React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';

interface IProps {
    type:string
}

/**
 * The save button component
 * @param props
 * @constructor
 */
export function SaveButton(props:IProps) {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef<number>();

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    const iconButton = () => {
        return (  <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
                aria-label="save"
                color="primary"
                sx={buttonSx}
                onClick={handleButtonClick}
            >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                     fill="#ffffff">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path
                        d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                </svg>
            </Fab>
            {loading && (
                <CircularProgress
                    size={68}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1,
                    }}
                />
            )}
        </Box>)
    }

    const textButton = () => {
        return (<Box sx={{ m: 1, position: 'relative' }}>
            <Button
                variant="contained"
                sx={buttonSx}
                disabled={loading}
                onClick={handleButtonClick}
            >
                Accept terms
            </Button>
            {loading && (
                <CircularProgress
                    size={24}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px',
                    }}
                />
            )}
        </Box>)
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {props.type === 'iconButton'? iconButton() : textButton()}
        </Box>
    );
}