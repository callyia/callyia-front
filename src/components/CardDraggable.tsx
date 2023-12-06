import type { FC, PropsWithChildren } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./PlanCard.css";

export type CardDraggableProps = {
  draggableId: string;
  index: number;
};

export const CardDraggable: FC<PropsWithChildren<CardDraggableProps>> = ({
  draggableId,
  index,
  children,
}) => {
  return (
    // <Draggable draggableId={draggableId} index={index}>
    //   {provided => {
    //     return (
    //       <div
    //         ref={provided.innerRef}
    //         {...provided.draggableProps}
    //         {...provided.dragHandleProps}>
    //         {children}
    //       </div>

    //     )
    //   }}
    // </Draggable>

    <Draggable draggableId={draggableId} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="plan-card">as</div>
          </div>
        );
      }}
    </Draggable>
  );
};
