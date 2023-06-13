import React from 'react';
import { RenderResult, render,screen, fireEvent, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CalcPage from './CalcPage';
import { Store, AnyAction } from '@reduxjs/toolkit';
import { CalcState } from '../AppTypes/AppTypes';
import { addition } from '../store/CalcSlice';

const mockStore = configureStore([]);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      "status": "ok",
      "totalResults": 52183,
      "articles": [
          {
              "source": {
                  "id": null,
                  "name": "Lifehacker.com"
              },
              "author": "Stephen Johnson",
              "title": "How Much Personal Data Would You Give Up for a Free 4K TV?",
              "description": "Tech startup Telly is making a a huge bet: The company’s business model involves giving away a dual-screen, 55”, 4K TV, plus a sound-bar and a teleconferencing camera, music software, games, and more, to the first half a million people who ask for one. Free t…",
              "url": "https://lifehacker.com/how-much-personal-data-would-you-give-up-for-a-free-4k-1850439401",
              "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/6daf8764adbe746fdd97182cf3a741ad.png",
              "publishedAt": "2023-05-16T15:00:00Z",
              "content": "Tech startup Telly is making a a huge bet: The companys business model involves giving away a dual-screen, 55, 4K TV, plus a sound-bar and a teleconferencing camera, music software, games, and more, … [+3452 chars]"
          },
          {
              "source": {
                  "id": "wired",
                  "name": "Wired"
              },
              "author": "Nadia Asparouhova",
              "title": "Remembering GitHub's Office, a Monument to Tech Culture",
              "description": "The code-hosting platform's headquarters was a living testament to tech values and one of its first disputed territories.",
              "url": "https://www.wired.com/story/github-tech-values/",
              "urlToImage": "https://media.wired.com/photos/64710db6c30f50376ee87478/191:100/w_1280,c_limit/ideas-gitbhub-monument-tech-spaces.png",
              "publishedAt": "2023-05-28T11:00:00Z",
              "content": "It was the spring of 2016, and I was in the Oval Office, waiting to interview for a job. Only I wasnt in Washington, DC. I was at the headquarters of GitHub, a code hosting platform, in San Francisco… [+3859 chars]"
          },
        ]})
  }),
) as jest.Mock;

describe('CalcPage', () => {
  let store: Store<unknown, AnyAction>;
  let component: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;

  beforeEach(() => {
    store = mockStore({
      calc: {
        firstValue: 1,
        secondValue: 3,
      },
    });

  });

  it('should render the component', () => {
     component = render(
        <Provider store={store}>
          <CalcPage />
        </Provider>,
      );
  
    expect(component).toBeTruthy();
  });

  it('should display two numbers, and sum', async () => {
    const dispatch = jest.fn();
    store.dispatch = dispatch;

    store = mockStore({
        calc: {
          firstValue: 2,
          secondValue: 3,
          total: 5,
          lastOperation : '+'
        },
      });
   
      component = render(
        <Provider store={store}>
          <CalcPage />
        </Provider>,
      );
  
        
    //const { getByTestId } = component;
 //   fireEvent.click(screen.getByTestId('addbutton'));
 //   addButton.click();
    /*store.dispatch(addition(
      {
          firstValue: 2, 
          secondValue: 3,
      }
  ) );
  await new Promise((r) => setTimeout(r, 1000));
*/
 // await waitFor(() => {
        expect(screen.getByText(/2 \+ 3 = 5/)).toBeInTheDocument();    
 //   });
});
}); 
