import {useEffect} from 'react';

import {Outlet} from 'react-router-dom';

import {Box, CircularProgress, Container} from '@mui/material';

import NavigationBottom from './NavigationBottom.tsx';
import TopBar from './TopBar.tsx';
import {Status, useAuthContext} from '../../shared/AuthContext.tsx';
import useAppRouter from '../../shared/hooks/useAppRouter.ts';

const Layout: React.FC = () => {
    const {goTo} = useAppRouter();
    const authContext = useAuthContext();

    useEffect(() => {
        if (!authContext.isLoading && authContext.status !== Status.Success) {
            goTo('login');
        }
    }, [authContext.isLoading, authContext.status]);

    return (
        <Container maxWidth="sm">
            <TopBar/>

            <Box sx={{marginTop: 6, marginBottom: 8}}>
                {authContext?.isLoading
                    ? (
                        <Box sx={{
                            display: 'flex',
                            height: '90vh',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <CircularProgress />
                        </Box>
                    )
                    : (<Outlet />)
                }
            </Box>

            <NavigationBottom />
        </Container>
    );
};

export default Layout;