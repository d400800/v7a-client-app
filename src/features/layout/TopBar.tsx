
import LogoutIcon from '@mui/icons-material/Logout';
import {Box, IconButton, Paper} from '@mui/material';

import useAppRouter from '../../shared/hooks/useAppRouter.ts';
import {usePostData} from '../../shared/hooks/useMutateData.ts';
export default function TopBar() {
    const {goTo} = useAppRouter();
    const {mutate} = usePostData();

    async function logout() {
        mutate({data: {}, url: 'auth/logout'});

        goTo('login');
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