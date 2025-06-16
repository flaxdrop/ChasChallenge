import { renderHook, act } from '@testing-library/react-hooks';
import useManualRefresh from '../hooks/useManualRefresh';

describe('useManualRefresh', () => {
  it('toggles refresh state when triggered', () => {
    const { result } = renderHook(() => useManualRefresh());

    const [initialValue] = result.current;
    expect(initialValue).toBe(false);

    act(() => {
      const [, triggerRefresh] = result.current;
      triggerRefresh();
    });

    const [afterTrigger] = result.current;
    expect(afterTrigger).toBe(true);
  });
});
