import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function NoMatch() {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate("/");
  }, [navigate]);
  return (
    <div className="flex flex-col p-4">
      <img
        src="./dummyimages/error.png"
        alt="error"
        className="self-center mb-6 w-36"
      />
      <p className="text-xl text-center">허가되지 않은 접근입니다.</p>
      <div className="flex justify-center mt-4">
        <button className="btn btn-primary btn-sm" onClick={goBack}>
          메인으로 이동
        </button>
      </div>
    </div>
  );
}
