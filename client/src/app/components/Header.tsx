'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { useAuth } from '../context/auth-context';
import { Button } from './ui/Button';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import dynamic from 'next/dynamic';

// Dynamically import Sidebar with SSR disabled to prevent hydration mismatch
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });

export const Header = () => {
  const { currentUser, signout } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignout = async () => {
    try {
      await signout();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.leftSection}>
            <IconButton 
              edge="start" 
              color="primary" 
              aria-label="menu" 
              onClick={toggleSidebar}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link href="/" className={styles.logo}>
              Healthcare
            </Link>
          </div>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li>
                <Link href="/" className={styles.navLink}>
                  Home
                </Link>
              </li>
              {currentUser ? (
                <>
                  <li>
                    <Link href="/dashboard" className={styles.navLink}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Button variant="outline" size="sm" onClick={handleSignout}>
                      Sign Out
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/auth/signin" className={styles.navLink}>
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link href="/auth/signup" passHref>
                      <Button variant="primary" size="sm">
                        Sign Up
                      </Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

Header.displayName = 'Header'; 