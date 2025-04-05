'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { useAuth } from '../context/auth-context';
import { Button } from './ui/Button';

export const Header = () => {
  const { currentUser, signout } = useAuth();

  const handleSignout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Healthcare
        </Link>
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
  );
};

Header.displayName = 'Header'; 