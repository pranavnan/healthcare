'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/app/components/ui/Input';
import { Button } from '@/app/components/ui/Button';
import { useAuth } from '@/app/context/auth-context';
import { ApiError } from '@/interface/apierror.interface';

const signinSchema = z.object({
  email: z.string().email({ message: 'Email must be valid' }),
  password: z.string().min(1, { message: 'Password is required' })
});

type SigninFormValues = z.infer<typeof signinSchema>;

export default function SignInPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signin } = useAuth();
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema)
  });

  const onSubmit = async (data: SigninFormValues) => {
    setIsLoading(true);
    setError('');
    
    try {
      await signin(data.email, data.password);
      router.push('/');
    } catch (err: unknown) {
      const apiError = err as ApiError;
      setError(apiError.response?.data?.errors?.[0]?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>Sign In</h1>
        <p>Welcome back! Please sign in to your account.</p>
      </div>
      
      {error && (
        <div className="error-message">
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
          Sign In
        </Button>
      </form>
      
      <div className="auth-footer">
        Don&apos;t have an account?{' '}
        <Link className="auth-link" href="/auth/signup">
          Sign up
        </Link>
      </div>
    </div>
  );
} 