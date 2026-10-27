"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Called when the live component throws, so the caller can fall back to the poster. */
  onError?: (error: Error) => void;
};

type State = { failed: boolean };

/**
 * Keeps one failing live component from blanking the page.
 *
 * The poster underneath is never unmounted, so when the live layer fails the
 * section falls back to the static placeholder rather than disappearing.
 */
export class LaserErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default LaserErrorBoundary;
