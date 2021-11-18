import { useContext } from "react";
import { Modal } from "rsuite";
import Button from "../../../../components/inputForm/Button";
import { Context } from "../controllers/Controller";
import DeleteController, { DeleteContext } from "../controllers/DeleteController";

const ModalDelete = () => {
  const { modalDeleteOpen, handleModalDelete } = useContext(Context);
  const { loadingDelete, handleDeleteUpdate } = useContext(DeleteContext);

  return (
    <Modal size={"sm"} open={modalDeleteOpen} onClose={() => handleModalDelete(false)}>
      <Modal.Header>
        <h2 className="poppins font-light text-base text-red-500">Delete Update</h2>
      </Modal.Header>
      <Modal.Body>Are you sure want to delete this Update?</Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end gap-x-4">
          <Button onClick={() => handleModalDelete(false)}>Cancel</Button>
          <Button
            className="bg-red-500 bg-opacity-60 hover:bg-opacity-80 text-white"
            onClick={handleDeleteUpdate}
            loading={loadingDelete}
          >
            Delete
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default () => (
  <DeleteController>
    <ModalDelete />
  </DeleteController>
);
