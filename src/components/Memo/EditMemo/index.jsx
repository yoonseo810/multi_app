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
import { useState } from 'react';
import { useThunk } from '../../../hooks/useThunk';
import { editMemo } from '../../../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const EditMemo = ({ memo }) => {
  const [title, setTitle] = useState(memo.title);
  const [content, setContent] = useState(memo.content);

  const [doEditMemo] = useThunk(editMemo);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleEditMemo = () => {
    const payloadObj = {
      ...memo,
      title,
      content,
    };
    doEditMemo(payloadObj);
  };

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="shadow">
        {/* Edit */}
        <FontAwesomeIcon icon={faPenToSquare} />
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
};

export default EditMemo;
