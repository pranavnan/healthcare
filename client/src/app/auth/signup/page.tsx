'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/auth-context';

const signupSchema = z.object({
  email: z.string().email({ message: 'Email must be valid' }),
  password: z.string()
    .min(4, { message: 'Password must be at least 4 characters' })
    .max(20, { message: 'Password must be less than 20 characters' })
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface ApiError {
  response?: {
    data?: {
      errors?: Array<{ message: string }>;
    };
  };
  message?: string;
}

export default function SignUpPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError('');
    
    try {
      await signup(data.email, data.password);
      router.push('/');
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.errors?.[0]?.message || 'Email in use');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>Sign Up</h1>
        <p>Create your account to get started.</p>
      </div>
      
      {error && (
        <div style={{ color: '#ef4444', padding: '0.75rem', backgroundColor: '#fef2f2', borderRadius: '0.375rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            fullWidth
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        
        <div>
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            fullWidth
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
        
        <Button type="submit" fullWidth loading={isLoading} disabled={isLoading}>
          Sign Up
        </Button>
      </form>
      
      <div className="auth-footer">
        Already have an account?{' '}
        <Link className="auth-link" href="/auth/signin">
          Sign in
        </Link>
      </div>
    </div>
  );
} 