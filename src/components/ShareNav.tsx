import { FC, useCallback } from "react";
import { Button, Navbar } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";
import useSheets from "../hooks/useSheets";
import client from "../utils/honoClient";

const ShareNav: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { sheets, deleteSheetById } = useSheets();
  const isMine = sheets.some((value) => value.id === Number(id));
  const handleClickDelete = useCallback(async () => {
    const response = await client.api.sheets[":sheetId"].$delete({
      param: { sheetId: id as string },
    });
    if (response.ok) {
      deleteSheetById(Number(id));
      navigate("/");
    } else {
      console.log(response);
    }
  }, [deleteSheetById, id, navigate]);
  return (
    <Navbar>
      <h1 className="text-4xl font-bold flex-1">カウンター</h1>
      {isMine && (
        <Button className="flex-none" color="ghost" onClick={handleClickDelete}>
          削除する
        </Button>
      )}
      <Button className="flex-none" color="ghost" onClick={() => navigate("/")}>
        トップに戻る
      </Button>
    </Navbar>
  );
};

export default ShareNav;
