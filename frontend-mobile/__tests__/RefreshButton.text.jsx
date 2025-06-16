import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RefreshButton from '../components/RefreshButton';

// Mock the useTheme hook
jest.mock('../theme/ThemeContext', () => ({
  useTheme: () => ({
    theme: {
      tabBarIcon: 'blue',
    },
  }),
}));

describe('RefreshButton', () => {
  it('calls onRefresh when pressed', () => {
    const onRefreshMock = jest.fn();

    const { getByRole } = render(<RefreshButton onRefresh={onRefreshMock} />);

    const button = getByRole('button');

    fireEvent.press(button);

    expect(onRefreshMock).toHaveBeenCalledTimes(1);
  });
});
