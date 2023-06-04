import { renderHook } from '@testing-library/react';
import { useWindowSize } from './useWindowSize';

describe('useWindowSize', () => {
  it('should return the window size', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current).toEqual({ width: window.innerWidth, height: window.innerHeight });
  });
});