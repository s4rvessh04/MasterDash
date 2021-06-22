import React from 'react';
import GithubStats from '../GithubStats';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('should render username', () => {
  const component = render(<GithubStats />);
  const username = component.getByTestId('random');

  expect(username.textContent).toBe('Targusrock');
});
