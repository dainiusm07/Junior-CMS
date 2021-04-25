import { TooltipProps } from '@material-ui/core';

export type InformationIndicatorProps = Omit<
  TooltipProps,
  'title' | 'children'
> & {
  info: Record<string, string | number>;
};
