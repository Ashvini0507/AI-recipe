import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children?: ReactNode;
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

  private handleReset = () => {
    // Clear local storage which might be causing issues
    localStorage.clear();
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
            <p className="text-gray-600 mb-6 text-sm">
              We encountered an unexpected error. This usually happens if your browser cache contains outdated data.
            </p>

            <div className="bg-red-50 p-4 rounded-xl text-left mb-6 overflow-auto max-h-32 text-xs font-mono text-red-800">
              {this.state.error?.message || 'Unknown error'}
            </div>

            <button
              onClick={this.handleReset}
              className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl h-12 font-bold transition-all shadow-md shadow-red-200"
            >
              <RefreshCcw className="w-4 h-4" />
              Reset App Data and Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
