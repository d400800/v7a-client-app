import {useEffect} from 'react';

import {Outlet, useNavigate} from 'react-router-dom';

import {Box, CircularProgress, Container} from '@mui/material';

import NavigationBottom from './NavigationBottom.tsx';
import TopBar from './TopBar.tsx';
import {Status, useAuthContext} from '../../shared/AuthContext.tsx';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const authContext = useAuthContext();

    useEffect(() => {
        if (!authContext.isLoading && authContext.status !== Status.Success) {
            navigate('/login');
        }
    }, [authContext.isLoading, authContext.status, navigate]);

    return (
        <Container maxWidth="sm">
            <TopBar/>

            <Box sx={{marginTop: 6}}>
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