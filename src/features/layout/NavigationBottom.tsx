import {SetStateAction, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import {BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';

export default function NavigationBottom() {
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const handleNavigationChange = (_event: React.SyntheticEvent, newValue: SetStateAction<number>) => {
        setValue(newValue);

        switch (newValue) {
            case 0:
                navigate('/');
                break;
            case 1:
                navigate('/supply-list');
                break;
            case 2:
                navigate('/item-creator');
                break;
            default:
                navigate('/');
                break;
        }
    };

    return (
        <Paper sx={{position: 'fixed', zIndex: 1030, bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleNavigationChange}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Shopping List" icon={<ChecklistIcon />} />
                <BottomNavigationAction label="Add item" icon={<AddIcon />} />
            </BottomNavigation>
        </Paper>
    );
}