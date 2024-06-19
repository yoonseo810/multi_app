import PropTypes from 'prop-types';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import DetailsCard from '../DetailsCard';

const DetailsModal = ({
  // isAlreadyAdded,
  // handleAdd,
  // addLoading,
  pokemon,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Modal size="4xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Pokemon Details</ModalHeader>
            <ModalBody className="flex">
              <DetailsCard pokemon={pokemon} />
            </ModalBody>
            <ModalFooter>
              {/* {!isAlreadyAdded && (
                <Button
                  color="success"
                  isLoading={addLoading}
                  onPress={handleAdd}
                >
                  {addLoading ? 'Adding' : 'Add'}
                </Button>
              )} */}
              <Button onPress={onClose}>Close</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

DetailsModal.propTypes = {
  pokemon: PropTypes.object,
  isOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  // isAlreadyAdded: PropTypes.bool,
  // handleAdd: PropTypes.func,
  // addLoading: PropTypes.bool,
};

export default DetailsModal;
