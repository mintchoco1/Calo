// 폰트 크기 정의

export const typography = {
  // 제목
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  
  // 본문
  body: {
    fontSize: 16,
    fontWeight: 'normal' as const,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  
  // 작은 글씨
  caption: {
    fontSize: 14,
    fontWeight: 'normal' as const,
  },
  tiny: {
    fontSize: 12,
    fontWeight: 'normal' as const,
  },
  
  // 큰 숫자 (칼로리 표시용)
  display: {
    fontSize: 48,
    fontWeight: 'bold' as const,
  },
};