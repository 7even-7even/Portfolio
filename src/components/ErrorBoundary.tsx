import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="route-message" role="alert">
          <h1>Something went wrong</h1>
          <p>The page could not be displayed. Please reload and try again.</p>
          <a href="/">Return home</a>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
