import { renderHook, waitFor } from '@testing-library/react';
import { useFetchAllData } from './useFetchAllData';

describe('useFetchAllData', () => {
  const urls: string[] = ['https://www.test.com/test1', 'https://www.test.com/test2'];

  it('should fetch data from multiple URLs and set state vars', async () => {
    const mockData1: string[] = ['testval1'];
    const mockData2: string[] = ['testval2'];
    const mockResponses: string[][] = [mockData1, mockData2];

    // Mock the global fetch function and return mock responses
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === urls[0]) {
        return Promise.resolve({ json: () => Promise.resolve(mockData1) });
      } else if (url === urls[1]) {
        return Promise.resolve({ json: () => Promise.resolve(mockData2) });
      }
      return Promise.reject(new Error('Invalid URL'));
    });

    // Render the hook
    const { result } = renderHook(() => useFetchAllData<string[][]>(urls));

    // Wait for the initial data to be fetched
    await waitFor(() => {
    // Updated state after data is fetched
      expect(result.current.data).toEqual(mockResponses);
    });

    await waitFor(() => {
      expect(result.current.error).toBeNull();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    await waitFor(() => {
      expect(result.current.setCount).toBeInstanceOf(Function);
    });

  
    // Verify the fetch function was called with the correct URLs
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(urls[0]);
    });
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(urls[1]);
  });

    // Update the count and trigger a re-render
    await waitFor(() => {
      result.current.setCount(1);
    });

    await waitFor(() => {
        expect(result.current.data).toEqual(mockResponses);
      });
  
      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
  
      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy();
      });
  
      await waitFor(() => {
        expect(result.current.setCount).toBeInstanceOf(Function);
      });
  
    
      // Verify the fetch function was called the correct number of times, 4 total now
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(4);
      });
});


  it('should handle fetch errors and set state vars', async () => {
    const errorMessage = 'Network error';

    // Mock the global fetch function and reject with an error
    global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));
    

    // Render the hook
    const { result } = renderHook(() => useFetchAllData<string[][]>(urls));

    // Initial state
    await waitFor(() => {
      expect(result.current.data).toEqual([[],[]]);
    });

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBeFalsy();
    });

    await waitFor(() => {
      expect(result.current.setCount).toBeInstanceOf(Function);
    });
  });

});
