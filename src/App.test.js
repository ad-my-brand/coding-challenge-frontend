import React from 'react';
import axios from 'axios';
import { act, cleanup, fireEvent, getByTestId, render, screen, wait, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
 
import App from './App';
jest.mock('axios');
// 
 
beforeEach(( )=>{
  console.log('i ran')
})
describe('Data fetching and rendering', () => {
  jest.clearAllMocks();
  test('fetches UserList and populates a list of users to display', async () => {
    
    
    const stories = [
      { id: 1, name: 'akash', address:{geo:{lat:'333',lng:'444'} }},
      { id: 2, name: 'React' ,address:{geo:{lat:'333',lng:'444'} }},
    ];
 
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data:  stories  })
    );
    
    render(<App />);
    expect(axios.get).toHaveBeenCalledTimes(1);
    await screen.debug()
    await fireEvent.click(screen.getByRole('button',{name:/Select a User/}));
    const items = await screen.findAllByRole('listitem');
     const name = await screen.findByText('akash')
     expect(items).toHaveLength(2);
     expect(name).toBeInTheDocument();
    await screen.debug()
  })}
  
)
describe('Submit Button click Error Message', () => {
  jest.clearAllMocks();
  test('error message is on screen', async () => {
    const stories = [
      { id: 1, name: 'akash', address:{geo:{lat:'333',lng:'444'} }},
      { id: 2, name: 'React' ,address:{geo:{lat:'333',lng:'444'} }},
    ];
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data:  stories  })
    );
    render(<App />);
    expect(await screen.getByRole('button',{name:/Submit/})).toBeInTheDocument();
    await fireEvent.click(screen.getByRole('button',{name:/Submit/}))
    // screen.debug()
    expect(screen.getByText('Please Select A User!')).toBeInTheDocument();
  })}
  
)
describe('Map display', () => {
  jest.clearAllMocks();
  test('map is displayed on user selection', async () => {
    const stories = [
      { id: 1, name: 'akash', address:{geo:{lat:'333',lng:'444'} }},
      { id: 2, name: 'React' ,address:{geo:{lat:'333',lng:'444'} }},
    ];
    const postSubmit = {}
    
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data:  stories  })
    );
    axios.post.mockImplementationOnce(() =>
    Promise.resolve({ data:  'success'  })
  );
    render(<App />);
    expect(screen.getByText("loading..")).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
    screen.debug()
    const userSelect = await screen.findByText('Select a User', {}, { timeout: 2000 })
    expect(userSelect).toBeInTheDocument();
    fireEvent.click(userSelect)
    const selectAUser = await screen.findByText('akash', {}, { timeout: 2000 })
    expect(selectAUser).toBeInTheDocument();
    
    act(()=>{
      fireEvent.click(selectAUser)
    })
    expect(await screen.findByTestId('frame', {}, { timeout: 2000 })).toBeInTheDocument();
     
  })
}
)
describe('Success and failure message diplay', () => {
  jest.clearAllMocks();
  test('Sucess message display on submission', async () => {
    const stories = [
      { id: 1, name: 'akash', address:{geo:{lat:'333',lng:'444'} }},
      { id: 2, name: 'React' ,address:{geo:{lat:'333',lng:'444'} }},
    ];
    const postSubmit = {}
    
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data:  stories  })
    );
    axios.post.mockImplementationOnce(() =>
    Promise.resolve({ data:  'success'  })
  );
    render(<App />);
    expect(screen.getByText("loading..")).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
    screen.debug()
    const userSelect = await screen.findByText('Select a User', {}, { timeout: 2000 })
    expect(userSelect).toBeInTheDocument();
    fireEvent.click(userSelect)
    const selectAUser = await screen.findByText('akash', {}, { timeout: 2000 })
    expect(selectAUser).toBeInTheDocument();
    act(()=>{
      fireEvent.click(selectAUser)
    })
    const title = await screen.getByPlaceholderText('title');
    const body = await screen.getByPlaceholderText('body');

    fireEvent.change(title,{
      target:{
        value:'new title'
      }
    })
    
    fireEvent.change(body,{
      target:{
        value:'new body text'
      }
    })
    expect(title.value).toBe('new title');
    expect(body.value).toBe('new body text');
    
    const submitButton = await screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument();
    
    fireEvent.click(
      submitButton
    )

    const successMessage =  await screen.findByText('You have made a successful submision!!', {}, { timeout: 2000 })
    expect(successMessage).toBeInTheDocument();
     
  })

  test('Failure message display on server error', async () => {
    const stories = [
      { id: 1, name: 'akash', address:{geo:{lat:'333',lng:'444'} }},
      { id: 2, name: 'React' ,address:{geo:{lat:'333',lng:'444'} }},
    ];
    const postSubmit = {}
    
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data:  stories  })
    );
    axios.post.mockImplementationOnce(() =>
    Promise.reject({ data:  'success'  })
  );
    render(<App />);
    expect(screen.getByText("loading..")).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledTimes(1);
    screen.debug()
    const userSelect = await screen.findByText('Select a User', {}, { timeout: 2000 })
    expect(userSelect).toBeInTheDocument();
    fireEvent.click(userSelect)
    const selectAUser = await screen.findByText('akash', {}, { timeout: 2000 })
    expect(selectAUser).toBeInTheDocument();
    act(()=>{
      fireEvent.click(selectAUser)
    })
    const title = await screen.getByPlaceholderText('title');
    const body = await screen.getByPlaceholderText('body');

    fireEvent.change(title,{
      target:{
        value:'new title'
      }
    })
    
    fireEvent.change(body,{
      target:{
        value:'new body text'
      }
    })
    expect(title.value).toBe('new title');
    expect(body.value).toBe('new body text');
    
    const submitButton = await screen.getByText('Submit')
    expect(submitButton).toBeInTheDocument();
    
    fireEvent.click(
      submitButton
    )

    const failureMessage =  await screen.findByText('We are having server issues,try sometime later.', {}, { timeout: 2000 })
    expect(failureMessage).toBeInTheDocument();
     
  })
}
)





