import React, { forwardRef } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, fullWidth, className = '', ...props }, ref) => {
    return (
      <div className={`${styles.inputContainer} ${fullWidth ? styles.fullWidth : ''}`}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.inputWrapper}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <input
            ref={ref}
            className={`${styles.input} ${error ? styles.error : ''} ${
              icon ? styles.hasIcon : ''
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input'; 