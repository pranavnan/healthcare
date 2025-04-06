'use client'
import * as React from 'react';
import { useAuth } from '../context/auth-context';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  roles: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const { currentUser } = useAuth();
  const router = useRouter();
  // Add a client-side only state to manage mounted state
  const [mounted, setMounted] = React.useState(false);
  
  // Only render on client-side to prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const menuItems: MenuItem[] = [
    { 
      text: 'Home', 
      icon: <HomeIcon />, 
      path: '/', 
      roles: ['admin', 'doctor', 'patient', 'nurse'] 
    },
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/dashboard', 
      roles: ['admin', 'doctor', 'patient', 'nurse'] 
    },
    { 
      text: 'Admin Panel', 
      icon: <AdminPanelSettingsIcon />, 
      path: '/admin', 
      roles: ['admin'] 
    },
    { 
      text: 'Appointments', 
      icon: <CalendarMonthIcon />, 
      path: '/appointments', 
      roles: ['doctor', 'patient', 'nurse'] 
    },
    { 
      text: 'Patients', 
      icon: <PersonIcon />, 
      path: '/patients', 
      roles: ['doctor', 'nurse', 'admin'] 
    },
    { 
      text: 'Medical Records', 
      icon: <MedicalServicesIcon />, 
      path: '/records', 
      roles: ['doctor', 'nurse', 'admin'] 
    },
    { 
      text: 'Settings', 
      icon: <SettingsIcon />, 
      path: '/settings', 
      roles: ['admin', 'doctor', 'patient', 'nurse'] 
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  // Filter menu items based on user role
  const filteredMenuItems = currentUser 
    ? menuItems.filter(item => item.roles.includes(currentUser.role))
    : menuItems.filter(item => item.path === '/');

  // Don't render anything on server
  if (!mounted) {
    return null;
  }

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {filteredMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => handleNavigation(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 