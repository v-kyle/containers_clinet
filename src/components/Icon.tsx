import htmlClasses from 'html-classes';
import React, { CSSProperties } from 'react';

export interface IconProps {
  type:
    | 'back'
    | 'search'
    | 'burger'
    | 'postilla'
    | 'chevron-left'
    | 'chevron-right'
    | 'chevron-down'
    | 'heart'
    | 'heart-filled'
    | 'share'
    | 'add'
    | 'remove'
    | 'close'
    | 'geo'
    | 'payment'
    | 'bag'
    | 'clear'
    | 'exit'
    | 'location'
    | 'question'
    | 'more'
    | 'mark'
    | 'gear'
    | 'pay-online'
    | 'nfc'
    | 'cash'
    | 'cashes'
    | 'time'
    | 'phone'
    | 'x-circle'
    | 'check-circle'
    | 'tablet'
    | 'drink'
    | 'car'
    | 'bonuses'
    | 'alert-circle'
    | 'chat'
    | 'check'
    | 'loyalty'
    | 'zip'
    | 'add-cart'
    | 'replace'
    | 'history'
    | 'settings'
    | 'star-rate'
    | 'save'
    | 'presets'
    | 'trash'
    | 'edit'
    | 'at-the-table'
    | 'paper-bag'
    | 'promocode'
    | 'thumb-up'
    | 'info-circle';
  className?: string;
  size?: number;
  onClick?: (e: React.MouseEvent) => void;
  style?: CSSProperties;
}

const Icon = (props: IconProps) => {
  const { className, style, type, onClick, size = 20 } = props;

  return (
    <svg
      name={type}
      role="icon"
      width={size}
      height={size}
      style={style}
      onClick={onClick ? onClick : () => void 0}
      className={htmlClasses('icon', className)}
    >
      <use xlinkHref={`/iconsSprite1.svg#${type}`} width={size} height={size} />
    </svg>
  );
};

export default Icon;
