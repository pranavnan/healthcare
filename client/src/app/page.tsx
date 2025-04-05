'use client';

import { useAuth } from './context/auth-context';
import { Button } from './components/ui/Button';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Modern Healthcare Platform</h1>
          <p className={styles.subtitle}>
            Access medical services, manage your appointments, and stay connected with healthcare professionals.
          </p>
          
          {!currentUser ? (
            <div className={styles.cta}>
              <Link href="/auth/signup" passHref>
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/auth/signin" passHref>
                <Button variant="outline" size="lg">Sign In</Button>
              </Link>
            </div>
          ) : (
            <div className={styles.cta}>
              <Link href="/dashboard" passHref>
                <Button size="lg">Go to Dashboard</Button>
              </Link>
            </div>
          )}
        </div>
        
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <h3>Online Consultations</h3>
            <p>Connect with healthcare professionals from the comfort of your home.</p>
          </div>
          
          <div className={styles.featureCard}>
            <h3>Appointment Management</h3>
            <p>Schedule, reschedule, or cancel appointments with ease.</p>
          </div>
          
          <div className={styles.featureCard}>
            <h3>Medical Records</h3>
            <p>Access your medical history and test results securely.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
