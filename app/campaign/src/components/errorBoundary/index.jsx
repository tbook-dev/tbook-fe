import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log("getDerivedStateFromError", error)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // logErrorToMyService(error, errorInfo);
    console.log("componentDidCatch->", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackComponent;
    }
    return this.props.children;
  }
}
