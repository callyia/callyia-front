// Cart.tsx
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { ScheduleItem } from "../../components/ScheduleCard";
import "./Cart.css";

const Cart: React.FC = () => {
  const [droppedCards, setDroppedCards] = useState<ScheduleItem[]>([]);

  const [{ isOver }, drop] = useDrop({
    accept: "SCHEDULE_CARD",
    drop: (item: ScheduleItem) => {
      // ScheduleCard 중복 체크
      if (!droppedCards.some((card) => card.id === item.id)) {
        setDroppedCards([...droppedCards, item]);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleRemoveCard = (idToRemove: number) => {
    const updatedCards = droppedCards.filter((card) => card.id !== idToRemove);
    setDroppedCards(updatedCards);
  };

  return (
    <div ref={drop} className={`cart ${isOver ? "hovered" : ""}`}>
      <h2>장바구니</h2>
      <div>
        원하는 일정을 여기에 드래그 해주세요!
        {droppedCards.map((droppedCard) => (
          <div
            key={droppedCard.id}
            className={`schedule-card dragged ${isOver ? "hovered" : ""}`}
          >
            <span className="schedule-number">{droppedCard.place}</span>
            <h3>{droppedCard.content}</h3>
            <p>
              TIP : {droppedCard.tip}
              <button
                className="removeBtn"
                onClick={() => handleRemoveCard(droppedCard.id)}
              >
                삭제
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
