// src/pages/auth/SignupPage.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  verificationCode: string;
}

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>();

  const password = watch('password');

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      // TODO: 실제 회원가입 API 호출 (이메일, 비밀번호, 인증코드 포함)
      console.log('회원가입 데이터:', {
        email: data.email,
        password: data.password,
        verificationCode: data.verificationCode,
      });

      alert('회원가입이 완료되었습니다');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다');
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
          <h2 className="mt-6 text-center text-title-1 font-extrabold text-black">
            관리자 회원가입
          </h2>
          <p className="mt-2 text-center text-body-3 text-grey04">관리자 계정을 생성하세요</p>
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
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey02 placeholder-grey04 text-black rounded-md focus:outline-none focus:ring-purple04 focus:border-purple04 text-body-3"
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
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey02 placeholder-grey04 text-black rounded-md focus:outline-none focus:ring-purple04 focus:border-purple04 text-body-3"
                placeholder="비밀번호를 입력하세요"
              />
              {errors.password && (
                <p className="mt-1 text-body-4 text-danger">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-body-3 font-medium text-black">
                비밀번호 확인
              </label>
              <input
                {...register('confirmPassword', {
                  required: '비밀번호 확인을 입력해주세요',
                  validate: (value) => value === password || '비밀번호가 일치하지 않습니다',
                })}
                type="password"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey02 placeholder-grey04 text-black rounded-md focus:outline-none focus:ring-purple04 focus:border-purple04 text-body-3"
                placeholder="비밀번호를 다시 입력하세요"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-body-4 text-danger">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="verificationCode" className="block text-body-3 font-medium text-black">
              인증코드
            </label>
            <input
              {...register('verificationCode', {
                required: '인증코드를 입력해주세요',
              })}
              type="text"
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-grey02 placeholder-grey04 text-black rounded-md focus:outline-none focus:ring-purple04 focus:border-purple04 text-body-3"
              placeholder="인증코드를 입력하세요"
            />
            {errors.verificationCode && (
              <p className="mt-1 text-body-4 text-danger">{errors.verificationCode.message}</p>
            )}
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
                  가입 중...
                </div>
              ) : (
                '회원가입'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-body-3 text-grey04">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="font-medium text-purple04 hover:text-purple05">
                로그인
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
