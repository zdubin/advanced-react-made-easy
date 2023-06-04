import { renderHook, waitFor } from '@testing-library/react';
import useFetch from './useFetch';

describe('useFetch', () => {
  it('should fetch data from the given URL', async () => {

    global.fetch = jest.fn().mockImplementation((url) => {
          return Promise.resolve({ json: () => Promise.resolve({test: 'hi mom'}) });
      });

    const url = 'https://jsonplaceholder.typicode.com/users';
    const { result } = renderHook(() => useFetch(url));
    await waitFor(() => {
        expect(result.current[0]).not.toBeNull();
    });
  });

  it('should return an error message if the fetch fails', async () => {
    global.fetch = jest.fn().mockImplementation((url) => {
        return Promise.reject(new Error('Invalid URL'));
    });


    const url = 'https://jsonplaceholder.typicode.com/users/invalid-url';
    const { result } = renderHook(() => useFetch(url));
    await waitFor(() => {
        expect(result.current[0]).toEqual( [{"name": "https://jsonplaceholder.typicode.com/users/invalid-url Error: Invalid URL"}]);
    });
  });
});
