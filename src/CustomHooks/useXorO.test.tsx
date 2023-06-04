import { renderHook, act } from '@testing-library/react';
import { useXorO } from './useXorO';

describe('useXorO', () => {
  it('should return X on even count', () => {
    const { result } = renderHook(() => useXorO());
    expect(result.current[0]()).toBe('X');
  });

  it('should return O on odd count', () => {
    const { result } = renderHook(() => useXorO());
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]()).toBe('O');
  });
});
