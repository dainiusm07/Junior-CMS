import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Permission } from '../generated/gql-types';
import { mockedUseSelector } from '../redux/redux-mock-helpers';
import { protectComponent, protectRouteComponent } from './protectComponent';

const testComponentText = 'Test component';
const TestComponent: React.FC = () => <div>{testComponentText}</div>;

describe('protectComponent', () => {
  describe('protectRouteComponent', () => {
    const fallbackComponentText = 'Fallback component';
    const FallbackComponent: React.FC = () => (
      <div>{fallbackComponentText}</div>
    );

    const renderWithRouter = (component: React.ComponentType) => {
      const protectedRoute = '/protected';
      window.history.pushState({}, 'Test page', protectedRoute);

      return render(
        <Switch>
          <Route path={protectedRoute} component={component} />
          <Route path="/" component={FallbackComponent} />
        </Switch>,
        { wrapper: Router },
      );
    };

    it('should render route with path "/" when user does not have permission', () => {
      mockedUseSelector.mockReturnValue(false);

      const component = protectRouteComponent(
        TestComponent,
        Permission.ReadProduct,
      );

      const { getByText, queryByText } = renderWithRouter(component);

      expect(queryByText(testComponentText)).toBeNull();
      expect(getByText(fallbackComponentText)).toBeInTheDocument();
    });

    it('should render protected route when user have permission', () => {
      mockedUseSelector.mockReturnValue(true);

      const component = protectRouteComponent(
        TestComponent,
        Permission.ReadProduct,
      );

      const { getByText, queryByText } = renderWithRouter(component);

      expect(queryByText(fallbackComponentText)).toBeNull();
      expect(getByText(testComponentText)).toBeInTheDocument();
    });
  });

  describe('protectComponent', () => {
    it(`should not render component if user does not have permission`, () => {
      mockedUseSelector.mockReturnValue(false);
      const Component = protectComponent(TestComponent, Permission.ReadProduct);

      const { queryByText } = render(<Component />);

      expect(queryByText(testComponentText)).toBeNull();
    });

    it(`should render component if user has permission`, () => {
      mockedUseSelector.mockReturnValue(true);
      const Component = protectComponent(TestComponent, Permission.ReadProduct);

      const { getByText } = render(<Component />);

      expect(getByText(testComponentText)).toBeInTheDocument();
    });
  });
});
