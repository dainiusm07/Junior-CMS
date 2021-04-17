import { OverridableComponent } from '@material-ui/core/OverridableComponent';
import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';

export type SideBarItemProps = {
  match: RegExp;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  onClick?: () => void;
  name: string;
  redirectTo: string;
};
