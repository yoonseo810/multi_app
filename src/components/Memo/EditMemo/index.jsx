import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from '@nextui-org/react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useThunk } from '../../../hooks/useThunk';
import { editMemo } from '../../../store';
import { useSelector } from 'react-redux';

const EditMemo = ({ memo, fetchMemos }) => {
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const [doEditMemo] = useThunk(editMemo);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { updatedData } = useSelector((state) => state.memos);

  const handleEditMemo = async () => {
    const payloadObj = {
      ...memo,
      title,
      content,
    };
    doEditMemo(payloadObj);
    // await fetchMemos();
    // console.log(memo);
    // console.log(title, content);
  };

  // useEffect(() => {
  //   if (updatedData) {
  //     fetchMemos();
  //   }
  // }, [updatedData, fetchMemos]);

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="shadow">
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Memo
              </ModalHeader>
              <ModalBody>
                <div>
                  <Input
                    type="text"
                    label="Title"
                    placeholder="Enter title"
                    value={title}
                    onValueChange={setTitle}
                    isInvalid={!title}
                    errorMessage="Please enter title"
                  />
                  <Textarea
                    label="Content"
                    placeholder="Enter content"
                    value={content}
                    onValueChange={setContent}
                    isInvalid={!content}
                    errorMessage="Please enter content"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  isDisabled={!title || !content}
                  color="primary"
                  onPress={() => {
                    handleEditMemo();
                    onClose();
                  }}
                >
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

EditMemo.propTypes = {
  memo: PropTypes.object,
  fetchMemos: PropTypes.func,
};

export default EditMemo;
