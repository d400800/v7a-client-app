import {useNavigate} from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import {Box, IconButton, Paper} from '@mui/material';

import {useMutateData} from '../../shared/hooks/useMutateData.ts';
export default function TopBar() {
    const navigate = useNavigate();
    const {mutate} = useMutateData();

    async function logout() {
        mutate({data: {}, url: 'api/auth/logout'});

        navigate('/login');
    }

    return (
        <Paper sx={{position: 'fixed', zIndex: 1030, top: 0, left: 0, right: 0}} elevation={3}>
            <Box display="flex" justifyContent="flex-end" py={.5} px={1}>
                <IconButton color="primary" onClick={() => logout()}>
                    <LogoutIcon/>
                </IconButton>
            </Box>
        </Paper>
    );
}