import React from 'react';

export enum DeviceType {
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP'
}

export enum ViewType {
  BLUEPRINT = 'BLUEPRINT',
  DOCUMENTATION = 'DOCUMENTATION',
  FIGMA = 'FIGMA'
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface ModuleNode {
  id: string;
  title: string;
  component: React.ReactNode;
  position: Coordinates; // Base position (top-left)
}

export interface Connection {
  id: string;
  from: string; // Node ID
  to: string;   // Node ID
  label?: string;
}

export interface AppConfig {
  zoom: number;
  device: DeviceType;
  view: ViewType;
}