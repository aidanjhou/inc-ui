import * as React from "react"
import { Checkbox } from "./checkbox"
import { Toggler } from "./toggler"
import { cn } from "../../lib/utils"

export interface TreeNode {
  id: string;
  label: string;
  shortcut?: string;
  children?: TreeNode[];
}

const treeSizeConfig = {
  xs: {
    row: "py-1 px-2 gap-1.5",
    label: "text-xs",
    arrow: "h-3 w-3",
    arrowBtn: "p-0",
    arrowPlaceholder: "w-3 h-3",
    shortcut: "text-[10px] px-1 py-0.2",
    indent: 14
  },
  sm: {
    row: "py-1.2 px-2.5 gap-2",
    label: "text-xs",
    arrow: "h-3.5 w-3.5",
    arrowBtn: "p-0",
    arrowPlaceholder: "w-3.5 h-3.5",
    shortcut: "text-[10px] px-1 py-0.5",
    indent: 16
  },
  default: {
    row: "py-1.5 px-3 gap-2",
    label: "text-sm",
    arrow: "h-4 w-4",
    arrowBtn: "p-0",
    arrowPlaceholder: "w-4 h-4",
    shortcut: "text-xs px-1.5 py-0.5",
    indent: 20
  },
  lg: {
    row: "py-2 px-3.5 gap-2.5",
    label: "text-sm font-medium",
    arrow: "h-4.5 w-4.5",
    arrowBtn: "p-0",
    arrowPlaceholder: "w-4.5 h-4.5",
    shortcut: "text-xs px-1.5 py-0.5",
    indent: 22
  },
  xl: {
    row: "py-2.5 px-4 gap-3",
    label: "text-base font-semibold",
    arrow: "h-5 w-5",
    arrowBtn: "p-0",
    arrowPlaceholder: "w-5 h-5",
    shortcut: "text-sm px-2 py-0.5",
    indent: 26
  },
  xxl: {
    row: "py-3 px-5 gap-3",
    label: "text-lg font-semibold",
    arrow: "h-5.5 w-5.5",
    arrowBtn: "p-0",
    arrowPlaceholder: "w-5.5 h-5.5",
    shortcut: "text-base px-2.5 py-1",
    indent: 30
  }
};

export type TreeSize = keyof typeof treeSizeConfig;

export interface TreeProps {
  /**
   * The tree data structure
   */
  data: TreeNode[];
  /**
   * Controlled checked keys (leaf nodes). If provided, checkbox states will be derived.
   */
  checkedKeys?: string[];
  /**
   * Default checked keys for uncontrolled mode
   */
  defaultCheckedKeys?: string[];
  /**
   * Callback triggered when checked state changes. Returns array of checked leaf keys.
   */
  onCheck?: (checkedKeys: string[]) => void;
  /**
   * Controlled expanded keys
   */
  expandedKeys?: string[];
  /**
   * Default expanded keys
   */
  defaultExpandedKeys?: string[];
  /**
   * Callback triggered when expand/collapse state changes
   */
  onExpand?: (expandedKeys: string[]) => void;
  /**
   * Class name for the tree container
   */
  className?: string;
  /**
   * Size of the tree elements (checkboxes, font, padding, indentation)
   */
  size?: TreeSize;
}

// Helper to get all leaf node IDs under a node
const getLeafIds = (node: TreeNode): string[] => {
  if (!node.children || node.children.length === 0) {
    return [node.id];
  }
  return node.children.flatMap(getLeafIds);
};

// Helper to check if a node is a leaf
const isLeaf = (node: TreeNode): boolean => {
  return !node.children || node.children.length === 0;
};

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      data,
      checkedKeys: controlledCheckedKeys,
      defaultCheckedKeys,
      onCheck,
      expandedKeys: controlledExpandedKeys,
      defaultExpandedKeys,
      onExpand,
      className,
      size = "default",
      ...props
    },
    ref
  ) => {
    const config = treeSizeConfig[size] || treeSizeConfig.default;

    // 1. Manage Expanded State
    const [localExpandedKeys, setLocalExpandedKeys] = React.useState<Set<string>>(() => {
      return new Set(defaultExpandedKeys || []);
    });

    const isExpandedControlled = controlledExpandedKeys !== undefined;
    const activeExpandedKeys = React.useMemo(() => {
      return isExpandedControlled ? new Set(controlledExpandedKeys) : localExpandedKeys;
    }, [isExpandedControlled, controlledExpandedKeys, localExpandedKeys]);

    const toggleExpand = React.useCallback(
      (nodeId: string) => {
        const nextExpanded = new Set(activeExpandedKeys);
        if (nextExpanded.has(nodeId)) {
          nextExpanded.delete(nodeId);
        } else {
          nextExpanded.add(nodeId);
        }

        if (!isExpandedControlled) {
          setLocalExpandedKeys(nextExpanded);
        }
        onExpand?.(Array.from(nextExpanded));
      },
      [activeExpandedKeys, isExpandedControlled, onExpand]
    );

    // 2. Manage Checked State (hierarchical selection)
    const [localCheckedKeys, setLocalCheckedKeys] = React.useState<Set<string>>(() => {
      return new Set(defaultCheckedKeys || []);
    });

    const isCheckedControlled = controlledCheckedKeys !== undefined;
    const activeCheckedKeys = React.useMemo(() => {
      return isCheckedControlled ? new Set(controlledCheckedKeys) : localCheckedKeys;
    }, [isCheckedControlled, controlledCheckedKeys, localCheckedKeys]);

    // Calculate state for any node based on active checked keys of leaf nodes
    const getNodeCheckedState = React.useCallback(
      (node: TreeNode): "" | "0" | "0.5" | "1" => {
        const leafIds = getLeafIds(node);
        const checkedLeafCount = leafIds.filter((id) => activeCheckedKeys.has(id)).length;

        if (checkedLeafCount === 0) {
          return ""; // Unselected
        }
        if (checkedLeafCount === leafIds.length) {
          return "1"; // Fully checked
        }
        return "0.5"; // Partically checked (indeterminate)
      },
      [activeCheckedKeys]
    );

    // Handle check toggle
    const handleCheckToggle = React.useCallback(
      (node: TreeNode, currentState: "" | "0" | "0.5" | "1") => {
        const leafIds = getLeafIds(node);
        const nextChecked = new Set(activeCheckedKeys);

        // If currently fully checked or partially checked, toggle to unchecked
        if (currentState === "1" || currentState === "0.5") {
          leafIds.forEach((id) => nextChecked.delete(id));
        } else {
          // If unchecked or unselected, toggle to fully checked
          leafIds.forEach((id) => nextChecked.add(id));
        }

        const nextCheckedArray = Array.from(nextChecked);
        if (!isCheckedControlled) {
          setLocalCheckedKeys(nextChecked);
        }
        onCheck?.(nextCheckedArray);
      },
      [activeCheckedKeys, isCheckedControlled, onCheck]
    );

    // 3. Render Node List recursively or flatly (flat list is cleaner for virtual styling)
    const renderNode = (node: TreeNode, level: number = 0): React.ReactNode => {
      const nodeLeaf = isLeaf(node);
      const expanded = activeExpandedKeys.has(node.id);
      const checkedState = getNodeCheckedState(node);

      return (
        <React.Fragment key={node.id}>
          {/* Node Row */}
          <div
            className={cn(
              "group flex items-center justify-between rounded-lg hover:bg-muted/50 transition-colors cursor-pointer select-none",
              "focus-within:bg-muted/80",
              config.row
            )}
            style={{ paddingLeft: `${level * config.indent + 12}px` }}
            onClick={() => {
              // Clicking the row toggles expand for parents, and toggles check for leaves
              if (!nodeLeaf) {
                toggleExpand(node.id);
              } else {
                handleCheckToggle(node, checkedState);
              }
            }}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* Expand Arrow or Placeholder */}
              {!nodeLeaf ? (
                <Toggler
                  pure
                  isExpanded={expanded}
                  onExpandChange={() => toggleExpand(node.id)}
                  size={size}
                  className={cn("shrink-0", config.arrowPlaceholder)}
                  onClick={(e) => e.stopPropagation()} // Avoid double toggle from row click
                />
              ) : (
                <div className={cn("shrink-0", config.arrowPlaceholder)} /> // Indent leaf nodes to align with parents
              )}

              {/* Checkbox */}
              <div onClick={(e) => e.stopPropagation()} className="flex items-center justify-center shrink-0">
                <Checkbox
                  pure
                  allowPartial={!nodeLeaf}
                  allowInverse={false} // tree doesn't use explicit "0" by default, just "" and "1" (with parent "0.5")
                  value={checkedState}
                  onChange={() => handleCheckToggle(node, checkedState)}
                  size={size}
                />
              </div>

              {/* Label */}
              <span className={cn("text-foreground truncate ml-1", config.label)}>
                {node.label}
              </span>
            </div>

            {/* Shortcut (for leaves) */}
            {nodeLeaf && node.shortcut && (
              <span className={cn("font-mono text-muted-foreground bg-muted/60 rounded border border-border/40 shrink-0 ml-2", config.shortcut)}>
                {node.shortcut}
              </span>
            )}
          </div>

          {/* Children (if expanded) */}
          {!nodeLeaf && expanded && node.children && (
            <div className="flex flex-col">
              {node.children.map((child) => renderNode(child, level + 1))}
            </div>
          )}
        </React.Fragment>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-0.5 border border-border bg-card rounded-xl p-2 shadow-sm max-w-full overflow-y-auto",
          className
        )}
        {...props}
      >
        {data.map((node) => renderNode(node, 0))}
      </div>
    )
  }
)

Tree.displayName = "Tree"
