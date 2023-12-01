import { Div, ReactDivProps } from "../../components";
import { FC } from "react";
import { Icon } from "../../theme/daisyui";

// ModalProps 타입 선언
// React에서 제공하는 div 요소의 속성들을 포함하며 open이라는 속성을 선택적으로 추가한다.
export type ModalProps = ReactDivProps & {
  open?: boolean;
};

// Modal 컴포넌트 생성
// 타입은 ModalProps로 사용자가 생성한 타입 div와 open 속성을 가짐
// 그렇기에 매개변수로 받은 객체에서 open, className 속성을 추출하여 사용
// 나머지 속성은 ...props로 받음
// div 속성을 반환하며 props를 그대로 전달하고 앞서 생성한 className을 클래스로 추가
// open이 true이면: 'modal modal-open _className'
// open이 false이면: 'modal _className'
export const Modal: FC<ModalProps> = ({
  open,
  className: _className,
  ...props
}) => {
  const className = ["modal", open ? "modal-open" : "", _className].join(" ");
  return <div {...props} className={className} />;
};

export type ModalContentProps = ReactDivProps & {
  onCloseIconClicked?: () => void;
  closeIconClassName?: string;
};
export const ModalContent: FC<ModalContentProps> = ({
  onCloseIconClicked,
  closeIconClassName: _closeIconClassName,
  className: _className,
  children,
  ...props
}) => {
  const showCloseIcon = onCloseIconClicked ? true : false;
  const className = [showCloseIcon, _className].join(" ");
  if (!showCloseIcon)
    return <div {...props} className={className} children={children} />;

  const closeIconClassName =
    _closeIconClassName ?? "btn-primary btn-outline btn-sm";
  return (
    <div {...props} className={className}>
      <Div className="sticky grid items-center w-[500px]">
        <Icon
          name="close"
          className={closeIconClassName}
          onClick={onCloseIconClicked}
        ></Icon>
      </Div>
      {children}
    </div>
  );
};

export type ModalActionProps = ReactDivProps & {};
export const ModalAction: FC<ModalActionProps> = ({
  className: _className,
  ...props
}) => {
  const className = ["modal-action", _className].join(" ");
  return <div {...props} className={className} />;
};
