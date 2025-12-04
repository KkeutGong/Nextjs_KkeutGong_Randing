import { NextSeo } from 'next-seo';
import { useState, useEffect, useCallback } from 'react';
import styles from './Reservations.module.scss';

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone?: string;
  certification?: string[];
  interest?: string;
  message?: string;
  createdAt: string;
}

export default function AdminReservations() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const token = typeof window !== 'undefined' ? sessionStorage.getItem('admin_token') : null;
      const response = await fetch('/api/reservations', {
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setReservations(data.data || []);
      } else {
        if (response.status === 401) {
          setIsAuthenticated(false);
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('admin_authenticated');
            sessionStorage.removeItem('admin_token');
          }
          setError('인증이 만료되었습니다. 다시 로그인해주세요.');
        } else {
          setError('사전예약 목록을 불러오는데 실패했습니다.');
        }
      }
    } catch (err) {
      setError('사전예약 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    // 클라이언트 사이드에서만 실행
    if (typeof window !== 'undefined') {
      try {
        const storedAuth = sessionStorage.getItem('admin_authenticated');
        if (storedAuth === 'true') {
          setIsAuthenticated(true);
          fetchReservations();
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
      }
    }
  }, [fetchReservations]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 클라이언트에서는 서버 API를 통해 인증 확인
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('admin_authenticated', 'true');
          sessionStorage.setItem('admin_token', data.token);
        }
        await fetchReservations();
      } else {
        setError('비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setError('로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('admin_authenticated');
      sessionStorage.removeItem('admin_token');
    }
    setPassword('');
    setReservations([]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 서버 사이드 렌더링 방지 - 초기 렌더링 시 로그인 화면 표시
  if (!mounted) {
    return (
      <>
        <NextSeo title="관리자 로그인 - 끝공" noindex />
        <div 
          className={styles.container}
          style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '2rem' }}
        >
          <div 
            className={styles.loginContainer}
            style={{ 
              maxWidth: '400px', 
              margin: '10rem auto', 
              background: 'white', 
              padding: '3rem', 
              borderRadius: '12px', 
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' 
            }}
          >
            <h1 
              className={styles.loginTitle}
              style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', textAlign: 'center', color: '#202124' }}
            >
              관리자 로그인
            </h1>
            <div style={{ textAlign: 'center', padding: '2rem', color: '#646464' }}>로딩 중...</div>
          </div>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <NextSeo title="관리자 로그인 - 끝공" noindex />
        <div className={styles.container}>
          <div className={styles.loginContainer}>
            <h1 className={styles.loginTitle}>관리자 로그인</h1>
            <form onSubmit={handleLogin} className={styles.loginForm}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className={styles.passwordInput}
                required
              />
              {error && <div className={styles.error}>{error}</div>}
              <button type="submit" className={styles.loginButton} disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NextSeo title="사전예약 관리 - 끝공" noindex />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>사전예약 관리</h1>
          <div className={styles.headerActions}>
            <button onClick={fetchReservations} className={styles.refreshButton} disabled={loading}>
              {loading ? '새로고침 중...' : '새로고침'}
            </button>
            <button onClick={handleLogout} className={styles.logoutButton}>
              로그아웃
            </button>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>총 사전예약 수</span>
            <span className={styles.statValue}>{reservations.length}</span>
          </div>
        </div>

        <div className={styles.tableContainer}>
          {reservations.length === 0 ? (
            <div className={styles.empty}>사전예약이 없습니다.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>연락처</th>
                  <th>준비 중인 자격증</th>
                  <th>관심 분야</th>
                  <th>메시지</th>
                  <th>신청일시</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr key={reservation.id}>
                    <td>{reservations.length - index}</td>
                    <td>{reservation.name}</td>
                    <td>
                      <a href={`mailto:${reservation.email}`} className={styles.emailLink}>
                        {reservation.email}
                      </a>
                    </td>
                    <td>{reservation.phone || '-'}</td>
                    <td>
                      {reservation.certification && reservation.certification.length > 0
                        ? Array.isArray(reservation.certification)
                          ? reservation.certification.join(', ')
                          : reservation.certification
                        : '-'}
                    </td>
                    <td>{reservation.interest || '-'}</td>
                    <td className={styles.messageCell}>
                      {reservation.message || '-'}
                    </td>
                    <td>{formatDate(reservation.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

