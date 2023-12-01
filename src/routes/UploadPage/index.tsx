import { useState } from "react";
import { Div } from "../../components";
import { IoCloseCircleOutline } from "react-icons/io5";
import * as S from "./style";

export const UploadPage = () => {
  //화면에 출력되는 파일
  const [selectedImages, setSelectedImages] = useState([]);
  //서버에 보내지는 파일
  const [selectedFiles, setSelectedFiles] = useState(null as any);

  const onSelectFile = (e: any) => {
    e.prevenetDefault();
    e.persist();
    //선택한 파일
    const selectedFiles = e.target.files;
    //선택한 파일을 fileUrlList에 넣는다.
    const fileUrlList = [...selectedFiles];

    // 업로할 파일을 찾기위해서는 filePath로 보내줄 url이 필요하다.
    for (let i = 0; i < selectedFiles.length; i++) {
      const nowUrl = URL.createObjectURL(selectedFiles[i]);
      fileUrlList.push(nowUrl);
    }

    setSelectedFiles(fileUrlList);

    //Array.from() 은 문자열 또는 유사 배열 객체를 배열로 만들어주는 메서드
    const selectedFileArray: any = Array.from(selectedFiles);

    const imageArray = selectedFileArray.map((file: any) => {
      return file.name;
    });

    // 첨부파일 삭제시
    setSelectedImages((previousImages: any) =>
      previousImages.concat(imageArray)
    );
    e.target.value = "";
  };

  const attachFile =
    selectedImages &&
    selectedImages.map((image: any) => {
      return (
        <S.DivImg key={image}>
          <div>{image}</div>
          <button
            onClick={() =>
              setSelectedImages(selectedImages.filter((e) => e !== image))
            }
          >
            <IoCloseCircleOutline size="30" />
          </button>
        </S.DivImg>
      );
    });

  const registApi = async (selectedFiles: any) => {
    alert("등록되었습니다.");
  };

  return (
    <div>
      <div>
        <tbody>
          <tr>
            <td>첨부파일</td>
            <td>
              <S.TableDiv>
                {selectedImages.length !== 0 ? (
                  <div>{attachFile}</div>
                ) : (
                  <S.NotDownload>파일을 첨부할 수 없습니다.</S.NotDownload>
                )}
                <S.ChangeButton>업로드</S.ChangeButton>
                {selectedImages.length !== 0 ? (
                  ""
                ) : (
                  <input
                    type="file"
                    name="images"
                    onChange={onSelectFile}
                    accept=".png, .jpg,image/*"
                  />
                )}
              </S.TableDiv>
            </td>
          </tr>
        </tbody>
      </div>
      <S.ChangeButton onClick={() => registApi(selectedFiles)}>
        등록
      </S.ChangeButton>
    </div>
  );
};
