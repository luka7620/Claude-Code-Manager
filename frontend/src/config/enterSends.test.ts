import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getEnterSends, setEnterSends, subscribeEnterSends } from './enterSends';

describe('enterSends config', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('defaults to false when localStorage is empty', () => {
    expect(getEnterSends()).toBe(false);
  });

  it('defaults to false for malformed stored value', () => {
    localStorage.setItem('ccm-enter-sends', 'banana');
    expect(getEnterSends()).toBe(false);
  });

  it('returns true when stored value is "true"', () => {
    localStorage.setItem('ccm-enter-sends', 'true');
    expect(getEnterSends()).toBe(true);
  });

  it('returns false when stored value is "false"', () => {
    localStorage.setItem('ccm-enter-sends', 'false');
    expect(getEnterSends()).toBe(false);
  });

  it('persists true', () => {
    setEnterSends(true);
    expect(localStorage.getItem('ccm-enter-sends')).toBe('true');
  });

  it('persists false', () => {
    setEnterSends(true);
    setEnterSends(false);
    expect(localStorage.getItem('ccm-enter-sends')).toBe('false');
  });

  it('notifies subscribers on change', () => {
    const callback = vi.fn();
    const unsubscribe = subscribeEnterSends(callback);
    setEnterSends(true);
    expect(callback).toHaveBeenCalledTimes(1);
    unsubscribe();
    setEnterSends(false);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('survives localStorage being unavailable', () => {
    const original = Storage.prototype.getItem;
    Storage.prototype.getItem = () => { throw new Error('denied'); };
    expect(getEnterSends()).toBe(false);
    Storage.prototype.getItem = original;
  });
});
