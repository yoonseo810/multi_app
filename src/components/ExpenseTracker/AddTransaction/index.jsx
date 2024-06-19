import { useEffect, useMemo, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Textarea,
  Input,
} from '@nextui-org/react';
import { addTransaction } from '../../../store';
import { incomeCategories, expenseCategories } from '../../../utils/constants';
import { useThunk } from '../../../hooks/useThunk';

const AddTransaction = () => {
  const [doAddTransaction] = useThunk(addTransaction);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedType, setSelectedType] = useState('Income');
  const [selectedCategory, setSelectedCategory] = useState(new Set([]));
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const amountError = useMemo(() => {
    if (amount <= 0) return 'Please enter valid amount';
    return '';
  }, [amount]);

  const categoryError = useMemo(() => {
    if (!selectedCategory?.currentKey) return 'Please select a category';
    return '';
  }, [selectedCategory]);

  const descError = useMemo(() => {
    if (!description) return 'Please enter description';
    return '';
  }, [description]);

  const reset = () => {
    setSelectedType('Income');
    setSelectedCategory(new Set([]));
    setDescription('');
    setAmount('');
  };

  const handleAddTransaction = () => {
    const payloadObj = {
      expenseType: selectedType,
      category: selectedCategory?.currentKey,
      description,
      amount: parseInt(amount, 10),
    };
    doAddTransaction(payloadObj);
  };

  const isAddDisabled = amountError || categoryError || descError;

  const categories =
    selectedType === 'Expense' ? expenseCategories : incomeCategories;

  useEffect(() => {
    setSelectedCategory(new Set([]));
  }, [selectedType]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  return (
    <>
      <Button onPress={onOpen}>Add New Transaction</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New Transaction
              </ModalHeader>
              <ModalBody>
                <div>
                  <RadioGroup
                    label="Income / Expense"
                    orientation="horizontal"
                    value={selectedType}
                    onValueChange={setSelectedType}
                  >
                    <Radio value="Income">Income</Radio>
                    <Radio value="Expense">Expense</Radio>
                  </RadioGroup>
                </div>
                <Select
                  label="Select Category"
                  className="max-w-xs"
                  selectedKeys={selectedCategory}
                  onSelectionChange={setSelectedCategory}
                  isInvalid={!selectedCategory?.currentKey}
                  errorMessage={categoryError}
                >
                  {categories.map((animal) => (
                    <SelectItem key={animal.value} value={animal.value}>
                      {animal.label}
                    </SelectItem>
                  ))}
                </Select>
                <div>
                  <Textarea
                    isInvalid={!description}
                    errorMessage={descError}
                    label="Description"
                    placeholder="Enter details"
                    value={description}
                    onValueChange={setDescription}
                  />
                </div>
                <Input
                  type="number"
                  label="Amount"
                  placeholder="Enter the amount"
                  value={amount}
                  onValueChange={setAmount}
                  isInvalid={amount <= 0}
                  errorMessage={amountError}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  isDisabled={isAddDisabled}
                  color="primary"
                  onPress={() => {
                    handleAddTransaction();
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

export default AddTransaction;
