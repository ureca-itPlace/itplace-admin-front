// src/pages/auth/LoginPage.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { showToast } from '../../utils/toast.tsx';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // 이미 로그인된 경우 리다이렉트
  if (user?.isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      // TODO: 실제 로그인 API 호출
      console.log('로그인 데이터:', data);

      // 로그인 성공
      login(data.email);
      navigate('/admin');
    } catch (error) {
      console.error('로그인 실패:', error);
      showToast('로그인에 실패했습니다. 다시 시도해주세요.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey01 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <img className="h-12 w-auto" src="/itPlace.svg" alt="IT Place" />
          </div>
          <h2 className="mt-6 text-center text-title-1 font-extrabold text-black">관리자 로그인</h2>
          <p className="mt-2 text-center text-body-3 text-grey04">관리자 계정으로 로그인하세요</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-body-3 font-medium text-black">
                이메일
              </label>
              <input
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '올바른 이메일 형식을 입력해주세요',
                  },
                })}
                type="email"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey02 placeholder-grey04 text-black rounded-md focus:outline-none focus:ring-purple04 focus:border-purple04 focus:z-10 text-body-3"
                placeholder="이메일을 입력하세요"
              />
              {errors.email && (
                <p className="mt-1 text-body-4 text-danger">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-body-3 font-medium text-black">
                비밀번호
              </label>
              <input
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 최소 6자 이상이어야 합니다',
                  },
                })}
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey02 placeholder-grey04 text-black rounded-md focus:outline-none focus:ring-purple04 focus:border-purple04 focus:z-10 text-body-3"
                placeholder="비밀번호를 입력하세요"
              />
              {errors.password && (
                <p className="mt-1 text-body-4 text-danger">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-body-3 font-medium rounded-md text-white bg-purple04 hover:bg-purple05 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple04 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <LoadingSpinner className="h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  로그인 중...
                </div>
              ) : (
                '로그인'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-body-3 text-grey04">
              계정이 없으신가요?{' '}
              <Link to="/signup" className="font-medium text-purple04 hover:text-purple05">
                회원가입
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
