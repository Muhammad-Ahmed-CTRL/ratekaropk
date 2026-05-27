'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-card border border-[rgba(255,100,100,0.1)] rounded-2xl p-8 text-center max-w-md mx-auto mt-10">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,100,100,0.1)] flex items-center justify-center mb-6">
            <AlertTriangle className="text-red-400" size={32} />
          </div>
          <h2 className="text-xl font-semibold text-white mb-3">Something went wrong</h2>
          <p className="text-[#8B8B9E] text-sm mb-8">
            An unexpected error occurred while loading this component. Please try again.
          </p>
          <button
            className="btn-teal px-8 py-3 text-sm font-medium w-full"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
