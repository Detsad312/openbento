// Mobile layout utilities for responsive grid conversion
import { BlockData } from '../types';

/**
 * Calculates the mobile grid layout for a block based on its desktop dimensions.
 *
 * Rules:
 * - Desktop colSpan 1-4 → Mobile 1 column (50% width)
 * - Desktop colSpan 5-9 → Mobile 2 columns (100% width)
 * - Medium blocks (colSpan 3-4) get minimum 2 rowSpan for better proportions
 */
export const getMobileLayout = (block: BlockData): { colSpan: number; rowSpan: number } => {
  // Large blocks (more than half of 9-col grid) → full width
  const mobileColSpan = block.colSpan >= 5 ? 2 : 1;

  // Medium blocks that become narrow need more height
  const mobileRowSpan =
    block.colSpan >= 3 && block.colSpan < 5 ? Math.max(block.rowSpan, 2) : block.rowSpan;

  return {
    colSpan: mobileColSpan,
    rowSpan: mobileRowSpan,
  };
};

/**
 * Mobile grid configuration constants
 */
export const MOBILE_GRID_CONFIG = {
  columns: 2,
  rowHeight: 80, // px per row
  gap: 12, // px between items
} as const;
