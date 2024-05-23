import {Alert, Snackbar} from '@mui/material';
import {AlertColor} from '@mui/material/Alert/Alert';

interface NotificationProps {
    open: boolean;
    message: string;
    severity: AlertColor;
    onClose: () => void;
}

export default function Notification({open, onClose, message, severity}: NotificationProps) {
    return (
        <Snackbar
            autoHideDuration={3000}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={open}
            onClose={() => onClose()}
            message={message}
        >
            <Alert
                onClose={() => onClose()}
                severity={severity}
                variant="filled"
                sx={{width: '100%'}}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}