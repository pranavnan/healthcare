'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth-context';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/auth/signin');
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>Welcome back, {currentUser.email}</p>
      </div>

      <div className={styles.overview}>
        <div className={styles.card}>
          <h3>Appointments</h3>
          <p className={styles.count}>0</p>
          <p className={styles.status}>No upcoming appointments</p>
        </div>

        <div className={styles.card}>
          <h3>Medical Records</h3>
          <p className={styles.count}>0</p>
          <p className={styles.status}>No records available</p>
        </div>

        <div className={styles.card}>
          <h3>Messages</h3>
          <p className={styles.count}>0</p>
          <p className={styles.status}>No new messages</p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>Getting Started</h2>
          <p>
            Welcome to your healthcare dashboard. Here you can manage your appointments,
            view your medical records, and communicate with healthcare professionals.
          </p>
          
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4>Complete Your Profile</h4>
                <p>Add your personal and medical information to get personalized care.</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4>Schedule an Appointment</h4>
                <p>Book your first appointment with a healthcare professional.</p>
              </div>
            </div>
            
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4>Explore Services</h4>
                <p>Discover the range of healthcare services available to you.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 