import { Card, CardProps } from '@material-ui/core';
import cls from 'clsx';

import useStyles from './MainContent.styles';

const MainContent: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Card className={cls(classes.root, className)} {...props}>
      {children}
    </Card>
  );
};

export default MainContent;
