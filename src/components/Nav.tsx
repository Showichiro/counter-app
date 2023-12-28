import { FC, useCallback, useRef } from "react";
import { Button, Input, Menu, Modal, Navbar } from "react-daisyui";
import useSheets from "../hooks/useSheets";
import client from "../utils/honoClient";
import useCategories from "../hooks/useCategories";
import { useNavigate, Link } from "react-router-dom";

const NavBar: FC = () => {
  const { sheets, insertSheet } = useSheets();
  const { categories } = useCategories();
  const { Dialog, handleHide, handleShow } = Modal.useDialog();
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleClickOk = useCallback(async () => {
    const response = await client.api["sheets:bulk-insert"].$post({
      json: {
        name: ref.current?.value ?? "",
        categories: categories.map((val) => ({
          name: val.title,
          counters: val.counters.map((counter) => ({
            name: counter.title,
            count: counter.count,
          })),
        })),
      },
    });
    if (response.ok) {
      const json = await response.json();
      insertSheet({ id: json.id, name: json.name });
      navigate(`/share/${json.id}`);
      handleHide();
    } else {
      console.log(response);
    }
  }, [categories, handleHide, insertSheet, navigate]);
  return (
    <>
      <Navbar>
        <h1 className="text-4xl font-bold flex-1">カウンター</h1>
        {sheets.length > 0 && (
          <div className="flex-none">
            <Menu horizontal className="px-1">
              <Menu.Item>
                <details>
                  <summary>保存データ</summary>
                  <ul>
                    {sheets.map((sheet) => (
                      <li key={`sheet-${sheet.id}`}>
                        <Link to={`/share/${sheet.id}`}>{sheet.name}</Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </Menu.Item>
            </Menu>
          </div>
        )}
        <Button
          className="flex-none"
          color="success"
          shape="square"
          onClick={handleShow}
        >
          共有
        </Button>
      </Navbar>
      <Dialog responsive>
        <Modal.Body>
          <Button
            onClick={handleHide}
            size="sm"
            shape="circle"
            color="ghost"
            className="absolute right-2 top-2"
          >
            X
          </Button>
          <div>内容を共有します。名前を決めてください。</div>
          <Input type="text" name="title" placeholder="名前" ref={ref} />
        </Modal.Body>
        <Modal.Actions>
          <Button color="primary" onClick={handleClickOk}>
            OK
          </Button>
        </Modal.Actions>
      </Dialog>
    </>
  );
};

export default NavBar;
