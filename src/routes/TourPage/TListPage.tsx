import house from "./images/house.avif";
import river from "./images/river.jpg";
import market from "./images/market.jpg";
import gamchun from "./images/gamchun.jpg";
import dummyData from "../../data/list";
import "./TListPage.css";

export default function TListPage() {
  return (
    <section>
      <div className="">
        <div className="">관광지</div>
        <input type="text" className="search" />
      </div>
      <div className="">
        {/* Flexbox 속성 추가하여 요소들이 가로로 출력되도록 변경 */}
        {dummyData.dummy.map((dummy, index) => (
          <div key={index} className="">
            <div className="ListContent shadowList" role="button" tabIndex={0}>
              <div>
                <div className="contentContainer">
                  <img
                    src={river} // 이미지 소스를 동적으로 변경해야 할 것 같습니다.
                    className="images"
                    alt={`Image ${index}`}
                  />
                </div>
                <div className="textContainer">
                  <span className="text-style">{dummy.area}</span>
                  <span className="text-style-second">{dummy.title}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
