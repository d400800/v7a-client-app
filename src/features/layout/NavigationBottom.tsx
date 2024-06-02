import {SetStateAction, useState} from 'react';

import AddIcon from '@mui/icons-material/Add';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import {BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';

import useAppRouter from '../../shared/hooks/useAppRouter.ts';

export default function NavigationBottom() {
    const [value, setValue] = useState(0);
    const {goTo} = useAppRouter();

    const handleNavigationChange = (_event: React.SyntheticEvent, newValue: SetStateAction<number>) => {
        setValue(newValue);

        switch (newValue) {
            case 0:
                goTo('');
                break;
            case 1:
                goTo('supply-list');
                break;
            case 2:
                goTo('item-creator');
                break;
            default:
                goTo('');
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