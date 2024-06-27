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
import { useState } from 'react';
import { useThunk } from '../../../hooks/useThunk';
import { createMemo } from '../../../store';

const CreateMemo = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [doAddMemo] = useThunk(createMemo);

  const handleAddMemo = () => {
    const payloadObj = {
      title,
      content,
    };
    doAddMemo(payloadObj);
  };

  const reset = () => {
    setTitle('');
    setContent('');
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Create new Memo
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Memo
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
                    handleAddMemo();
                    onClose();
                    reset();
                  }}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateMemo;
