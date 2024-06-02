import {useState} from 'react';

import {Box, Button, Container, TextField, Typography} from '@mui/material';

import {Status, useAuthContext} from '../../shared/AuthContext.tsx';
import useAppRouter from '../../shared/hooks/useAppRouter.ts';
import {usePostData} from '../../shared/hooks/useMutateData.ts';

const LoginPage: React.FC = () => {
    const authContext = useAuthContext();
    const {goTo} = useAppRouter();
    const {mutate} = usePostData();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    async function login() {
        mutate(
            {data: {username, password}, url: 'auth/login'},
            {
                onSuccess: (data: any) => {
                    console.log('Login successful:', data);

                    const token = data.access_token;

                    // Save the token to local storage
                    localStorage.setItem('access_token', token);

                    authContext.setContextValue((prevState) => ({...prevState, status: Status.Success}));

                    goTo('');
                },
                onError: (error) => {
                    console.error('Login failed:', error);
                    setErrorMsg('Failed to log-in. Please, check your credentials.');
                }
            }
        );
    }

    return (
        <>
            <Container maxWidth="sm" sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh'
            }}>
                <Box
                    width="100%"
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Box my={2}>
                        <TextField
                            fullWidth
                            size="small"
                            required
                            label="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Box>

                    <Box my={2}>
                        <TextField
                            fullWidth
                            size="small"
                            required
                            label="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Box>

                    {errorMsg &&
                        <Box mb={2}>
                            <Typography color="error">{errorMsg}</Typography>
                        </Box>
                    }

                    <Box mt={5}>
                        <Button variant="contained" fullWidth onClick={() => login()}>Login</Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default LoginPage;