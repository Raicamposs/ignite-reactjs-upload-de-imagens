import {
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="pGray.900" p={0}>
        <ModalBody p={0}>{imgUrl && <Image src={imgUrl} />}</ModalBody>

        <ModalFooter justifyContent="start">
          <Link href={imgUrl} target="_blank">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
