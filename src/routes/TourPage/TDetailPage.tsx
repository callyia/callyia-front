import { useParams } from "react-router-dom";
import { Button } from "../../theme/daisyui";
import { useState } from "react";
import { Modal, ModalAction, ModalContent } from "./Modal";
import * as List from "./TListPage";

export default function TDetailPage(props: any) {
  let { id } = useParams();
  let findId = props.list.find(function (item: any) {
    return item.id == id;
  });

  const [openDetail, setOpenDetail] = useState(false);

  const closeDetailClicked = () => {
    setOpenDetail(false); // 모달 닫기
  };

  const basketClicked = () => {
    setOpenDetail(false); // 모달 닫기
  };

  const openDetailClicked = () => {
    setOpenDetail(true); // 모달 열기
  };
  return (
    <section className="mt-4">
      <Modal className="container sticky" open={openDetail}>
        <ModalContent onCloseIconClicked={closeDetailClicked}>
          <div>
            <h3>상세페이지입니다.</h3>
          </div>
          <div className="flex">
            <div className="grid grid-flow-row grid-cols-2 gap-2">
              <p>이름 : </p>
              <p>{findId.title}</p>
              <p>지역 : </p>
              <p>{findId.area}</p>
              <p>내용 : </p>
              <p>{findId.content}</p>
            </div>
            {/* <div>{findId.image}</div> */}
          </div>
          <div className="footer">
            <ModalAction>
              <Button
                className="w-24 normal-case btn-primary btn-sm"
                onClick={basketClicked}
              >
                Basket
              </Button>
              <Button
                className="w-24 normal-case btn-sm"
                onClick={closeDetailClicked}
              >
                Close
              </Button>
            </ModalAction>
          </div>
        </ModalContent>
      </Modal>
    </section>
  );
}
